module.exports = {
	name: "queue",
	alias: ["q"],
	description: "Shows the first 10 songs of the queue.",
	guildOnly: true,
	async execute(message) {
		const { author, client, guild, member } = message;
		const queue = client.distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not connected to a voice channel. Type** \`${process.env.PREFIX}join\` **to get me in one**`);
		message.reply({embed: {
			title: `Queue for ${guild.name}`,
			description: `__Now Playing__:\n${queue.songs.map(({ name, url, formattedDuration, user }, index) => `\`${index}.\` [${name}](${url}) | \`${formattedDuration} Requested by: ${member.displayName} (${user.tag})\``).join("\n")}`,
			color: 2793983,
			footer: {
				text: `Volume: ${queue.volume}% | Filter: ${queue.filter || "❌"} | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Entire Queue" : "This Song" : "❌"} | Autoplay: ${queue.autoplay ? "On" : "❌"}`,
				icon_url: author.displayAvatarURL({ dynamic: true })
			}
		}});
	}
};