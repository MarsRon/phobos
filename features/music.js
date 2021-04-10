const DisTube = require("distube");
const { formatDuration } = require("distube/src/duration");

module.exports = function(client) {
	const distube = new DisTube(client, { emitNewSongOnly: true, highWaterMark: 1 << 25 });

	const status = queue => `Volume: ${queue.volume}% | Filter: ${queue.filter || "❌"} | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "❌"} | Autoplay: ${queue.autoplay ? "On" : "❌"}`;

	distube
		.on("playSong", ({ channel }, queue, { name, url, formattedDuration, user, thumbnail }) => channel.send({embed: {
			description: `[${name}](${url}) - \`${formattedDuration}\`\n\n\`Requested by:\` <@${user.id}> (${user.tag})\n\n${status(queue)}`,
			color: 2793983,
			thumbnail: { url: thumbnail },
			author: {
				name: "Playing ♪",
				url: "https://marsron.github.io/phobos/",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}}))

		.on("addSong", ({ author, channel }, queue, { name, url, duration, formattedDuration, thumbnail }) => channel.send({embed: {
			title: name,
			url,
			fields: [
				{ name: "Song Duration", value: formattedDuration, inline: true },
				{
					name: "Estimated time until playing",
					value: formatDuration(queue.songs.reduce((acc, cur) => acc += cur.duration, -duration) * 1000),
					inline: true
				},
				{ name: "Position in queue", value: queue.songs.length-1, inline: true }
			],
			color: 2793983,
			thumbnail: { url: thumbnail },
			author: {
				name: "Added to queue ♪",
				url: "https://marsron.github.io/phobos/",
				icon_url: author.displayAvatarURL({ dynamic: true })
			}
		}}))

		.on("playList", ({ author, channel }, queue, playlist, song) => channel.send({embed: {
			description: `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`,
			color: 2793983,
			author: {
				name: "Playlist added to queue ♪",
				url: "https://marsron.github.io/phobos/",
				icon_url: author.displayAvatarURL({ dynamic: true })
			}
		}}))

		.on("addList", (message, queue, playlist) => message.reply(
			`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
		))

		.on("searchResult", (message, result) => {
			let i = 0;
			message.reply(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
		})

		.on("searchCancel", message => message.reply(":white_check_mark:"))

		.on("error", (message, e) => {
			console.log(e.message);
			message.reply(`:x: An error occured:\n${e}`);
		});

	client.distube = distube;
};