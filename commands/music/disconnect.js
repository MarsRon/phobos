module.exports = {
	name: "disconnect",
	alias: ["dc", "leave", "dis", "fuckoff", "stop"],
	description: "Disconnects the bot from the voice channel it is in.",
	guildOnly: true,
	execute(message) {
		const { client: { distube } } = message;
		if (!distube.getQueue(message))
			return message.reply(`:x: **I am not connected to a voice channel. Type** \`${process.env.PREFIX}join\` **to get me in one**`);
		distube.stop(message);
		message.reply("**Successfully disconnected**");
	}
};