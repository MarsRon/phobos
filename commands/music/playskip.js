module.exports = {
	name: "playskip",
	alias: ["ps", "pskip"],
	description: "Skips the current song and plays the song you requested.",
	args: true,
	usage: "<link|query>",
	guildOnly: true,
	execute(message, args) {
		if (!message.member.voice.channelID)
			return message.reply(":x: **You have to be in a voice channel to use this command**");

		const query = args.join(" ");
		message.reply(`:mag_right: **Searching** \`${query}\``);
		message.client.distube.playSkip(message, query);
	}
};
