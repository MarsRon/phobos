const Guild = require("../../db/guild");

module.exports = {
	name: "skip",
	alias: ["s"],
	description: "Skips the current playing song.",
	guildOnly: true,
	execute(message) {
		const { client: { distube }, guild } = message;
		const gdb = Guild(guild.id);
		const queue = distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not connected to a voice channel. Type** \`${gdb.get().prefix}join\` **to get me in one**`);
		distube.skip(message);
		message.reply("**Skipped song**");
	}
};