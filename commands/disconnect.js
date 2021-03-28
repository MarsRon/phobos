const queue = require("../features/musicQueue");
const { PREFIX: prefix } = process.env;

module.exports = {
	name: "disconnect",
	alias: ["dc", "leave", "dis", "fuckoff"],
	description: "Disconnects the bot from the voice channel it is in",
	guildOnly: true,
	execute(message) {
		const { guild: { id: guildId } } = message;
		const guildQueue = queue.get(guildId);
		if (!guildQueue)
			return message.reply(`:x: **I am not connected to a voice channel.** Type \`${prefix}join\` to get me in one`);
		queue.delete(guildId);
		guildQueue.connection.disconnect();
	}
}