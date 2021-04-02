const filters = ["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "flanger", "gate", "haas", "reverse", "surround", "mcompand", "phaser", "tremolo", "earwax"];

module.exports = {
	name: "filter",
	description: "Sets the music filter",
	usage: "<filter>",
	guildOnly: true,
	execute(message, args) {
		const { client: { distube } } = message;
		if (!distube.getQueue(message))
			return message.reply(`:x: **I am not connected to a voice channel. Type** \`${process.env.PREFIX}join\` **to get me in one**`);
		if (!filters.includes(args[0]))
			return message.reply(`:x: Invalid filter\nAvailable filters: \`${filters.join("`, `")}\``);
		message.reply(`Current filter: ${distube.setFilter(message, args[0]) || "Off"}`);
	}
};