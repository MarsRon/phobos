const Guild = require("../../db/guild");

module.exports = {
	name: "shuffle",
	description: "Shuffles the music queue.",
	guildOnly: true,
	async execute(message) {
		const { client: { distube }, guild } = message;
		const { prefix } = (await Guild(guild.id)).get();
		const queue = distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not playing music. Use** \`${prefix}play\`** to play some music!**`);
		distube.shuffle(message);
		message.reply(`Queue shuffled. Use \`${prefix}queue\` to view the music queue!`);
	}
};
