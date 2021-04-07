module.exports = {
	name: "skip",
	alias: ["s"],
	description: "Skips the current playing song.",
	guildOnly: true,
	execute(message) {
		const { client: { distube } } = message;
		let queue = distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not connected to a voice channel. Type** \`${process.env.PREFIX}join\` **to get me in one**`);
		distube.skip(message);
		message.reply("**Skipped song**");
	}
};