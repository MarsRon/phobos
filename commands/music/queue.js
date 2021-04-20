const Guild = require("../../db/guild");

module.exports = {
	name: "queue",
	alias: ["q"],
	description: "Shows the first 10 songs of the queue.",
	guildOnly: true,
	async execute(message) {
		const { author, client, guild, member } = message;
		const gdb = await Guild(guild.id);
		const queue = client.distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not connected to a voice channel. Type** \`${gdb.get().prefix}play\` **to get me in one**`);
		const { songs } = queue;
		const formattedSongs = queue.songs.map(({ name, url, formattedDuration, user }, index) => `\`${index}.\` [${name}](${url}) | \`${formattedDuration} Requested by: ${member.displayName} (${user.tag})\``);
		let maxI = 0, count = 0;
		for (const song of songs) {
			let sum = count + song.length + 1;
			if (sum > 2031)
				break;
			count = sum;
			maxI++;
		}
		message.reply({
			content: "Queue shuffled",
			embed: {
				title: `Queue for ${guild.name}`,
				description: `__Now Playing__:\n${formattedSongs.filter((_, i) => i < maxI).join("\n")}`,
				color: 2793983,
				footer: {
					text: `Volume: ${queue.volume}% | Filter: ${queue.filter || "❌"} | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Entire Queue" : "This Song" : "❌"} | Autoplay: ${queue.autoplay ? "On" : "❌"}`,
					icon_url: author.displayAvatarURL({ dynamic: true })
				}
			}
		});
	}
};