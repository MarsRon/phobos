module.exports = {
	name: "slowmode",
	description: "Set slowmode time for a channel",
	args: true,
	usage: "<seconds> [channel]",
	guildOnly: true,
	permission: "MANAGE_CHANNELS",
	execute(message, args) {
		const { channel, guild, mentions } = message;
		const rate = parseInt(args[0]);

		if (isNaN(rate))
			return message.reply(":x: Argument must be a number");
		if (rate > 21600 || rate < 1)	
			return message.reply(":x: Number must be between 1 - 21600");

		const target = mentions.channels.first() || guild.channels.cache.get(args[1]) || channel;
		target.setRateLimitPerUser(rate);
		message.reply(`Slowmode set to ${rate}`);
	}
};