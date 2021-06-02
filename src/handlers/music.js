const DisTube = require("distube");
const { formatDuration } = require("distube/src/duration");

const client = require("./client");

const status = queue =>
	`Volume: ${
		queue.volume
	}% | Filter: ${
		queue.filter || "❌"
	} | Loop: ${
		queue.repeatMode ?
			queue.repeatMode === 2 ? "All Queue" :"This Song"
			: "❌"
	} | Autoplay: ${queue.autoplay ? "On" : "❌"}`;

const distube = new DisTube(client, { emitNewSongOnly: true, highWaterMark: 1 << 25 });

distube
	.on("playSong", (
		{ channel },
		queue,
		{ name, url, formattedDuration, user, thumbnail }
	) => channel.send({
		embed: {
			description: `[${name}](${url}) - \`${formattedDuration}\`

\`Requested by:\` <@${user.id}> (${user.tag})

${status(queue)}`,
			color: 4404979,
			thumbnail: { url: thumbnail },
			author: {
				name: "Now Playing ♪",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}
	}))

	.on("addSong", (
		{ author, channel },
		{ currentTime, songs },
		{ name: title, url, formattedDuration, thumbnail }
	) => channel.send({embed: {
		title,
		url,
		fields: [
			["Song Duration", formattedDuration],
			[
				"Estimated time until playing",
				formatDuration(songs
					.filter((_,i) => i !== 0 && i + 1 !== songs.length) // Remove currently playing and newly added song
					.reduce(
						(acc, cur) => acc += cur.duration, // Add all song duration
						songs[0].duration - ~~(currentTime/1000) // Calculate time left for current song
					) * 1000
				)
			],
			["Position in queue", songs.length - 1]
		].map(([name, value]) => ({ name, value, inline: true })),
		color: 4404979,
		thumbnail: { url: thumbnail },
		author: {
			name: "Added to queue ♪",
			url: "https://phobos.marsron.repl.co",
			icon_url: author.displayAvatarURL({ dynamic: true })
		}
	}}))

	.on("playList", ({ author, channel }, queue, playlist, song) => channel.send({embed: {
		description: `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).
Requested by: ${song.user}
Now playing \`${song.name}\` - \`${song.formattedDuration}\`
${status(queue)}`,
		color: 4404979,
		author: {
			name: "Playlist added to queue ♪",
			url: "https://phobos.marsron.repl.co",
			icon_url: author.displayAvatarURL({ dynamic: true })
		}
	}}))

	.on("addList", (message, queue, playlist) => message.reply(
		`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
	))

	.on("searchResult", (message, result) =>
		message.reply(`**Choose an option from below**\n${
			result.map((song, i) =>
				`**${i+1}**. ${song.name} - \`${song.formattedDuration}\``
			).join("\n")
		}\n*Enter anything else or wait 60 seconds to cancel*`)
	)

	.on("searchCancel", message => message.reply(":white_check_mark:"))

	.on("error", (message, e) => {
		console.log(`[music] ${e.message}`);
		message.reply(`:x: An error occurred:\n${e.message}`);
	});

client.distube = distube;
