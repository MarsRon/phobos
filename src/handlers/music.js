const DisTube = require("distube");
const { formatDuration } = require("distube/src/duration");

const client = require("./client");

const status = queue =>
	`Volume: ${queue.volume}% | Filter: ${queue.filter || "❌"} | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "❌"} | Autoplay: ${queue.autoplay ? "On" : "❌"}`;

const distube = new DisTube(client, { emitNewSongOnly: true, highWaterMark: 1 << 25 });
distube
	.on("playSong", ({ channel }, queue, { name, url, formattedDuration, user, thumbnail }) => channel.send({embed: {
		description: `[${name}](${url}) - \`${formattedDuration}\`\n\n\`Requested by:\` <@${user.id}> (${user.tag})\n\n${status(queue)}`,
		color: 4404979,
		thumbnail: { url: thumbnail },
		author: {
			name: "Now Playing ♪",
			url: "https://phobos.marsron.repl.co",
			icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
		}
	}}))

	.on("addSong", ({ author, channel }, { currentTime, songs }, { name, url, formattedDuration, thumbnail }) => channel.send({embed: {
		title: name,
		url,
		fields: [
			{ name: "Song Duration", value: formattedDuration, inline: true },
			{
				name: "Estimated time until playing",
				value: formatDuration(songs
					.filter((_,i) => i !== 0 && i !== songs.length - 1) // Remove currently playing and this song
					.reduce(
						(acc, cur) => acc += cur.duration,
						songs[0].duration - ~~(currentTime/1000)
					) * 1000),
				inline: true
			},
			{ name: "Position in queue", value: songs.length - 1, inline: true }
		],
		color: 4404979,
		thumbnail: { url: thumbnail },
		author: {
			name: "Added to queue ♪",
			url: "https://phobos.marsron.repl.co",
			icon_url: author.displayAvatarURL({ dynamic: true })
		}
	}}))

	.on("playList", ({ author, channel }, queue, playlist, song) => channel.send({embed: {
		description: `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`,
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
		message.reply(`**Choose an option from below**\n${result.map((song, i) => `**${i+1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
	)

	.on("searchCancel", message => message.reply(":white_check_mark:"))

	.on("error", (message, e) => {
		console.log(e.message);
		message.reply(`:x: An error occured:\n${e.message}`);
	});

client.distube = distube;
