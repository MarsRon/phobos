const Guild = require("../../db/guild");

function shuffle(array) {
	let l = array.length, t, i;
	while (l) {
		i = Math.floor(Math.random() * l--);
		t = array[l];
		array[l] = array[i];
		array[i] = t;
	}
	return array;
}

module.exports = {
	name: "shuffle",
	description: "Shuffles the music queue.",
	guildOnly: true,
	async execute(message) {
		const { author, client, guild, member } = message;
		const queue = client.distube.getQueue(message);
		const gdb = await Guild(guild.id);
		if (!queue)
			return message.reply(`:x: **I am not connected to a voice channel. Type** \`${gdb.get().prefix}join\` **to get me in one**`);
		shuffle(queue.songs);
		message.reply({
			content: "Queue shuffled",
			embed: {
				title: `Queue for ${guild.name}`,
				description: `__Now Playing__:\n${queue.songs.map(({ name, url, formattedDuration, user }, index) => `\`${index}.\` [${name}](${url}) | \`${formattedDuration} Requested by: ${member.displayName} (${user.tag})\``).join("\n")}`,
				color: 2793983,
				footer: {
					text: `Volume: ${queue.volume}% | Filter: ${queue.filter || "❌"} | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Entire Queue" : "This Song" : "❌"} | Autoplay: ${queue.autoplay ? "On" : "❌"}`,
					icon_url: author.displayAvatarURL({ dynamic: true })
				}
			}
		});
	}
};