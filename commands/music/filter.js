const Guild = require("../../db/guild");

const filters = ["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "flanger", "gate", "haas", "reverse", "surround", "mcompand", "phaser", "tremolo", "earwax"];

module.exports = {
	name: "filter",
	description: "Change the music filter.",
	usage: "<filter>",
	guildOnly: true,
	async execute(message, args) {
		const { client: { distube }, guild } = message;
		const gdb = await Guild(guild.id);
		if (!distube.getQueue(message))
			return message.reply(`:x: **I am not playing music. Use** \`${gdb.get().prefix}play\`** to play some music!**`);
		if (!filters.includes(args[0]))
			return message.reply(`:x: Invalid filter\nAvailable filters: \`${filters.join("`, `")}\``);
		message.reply(`Current filter: ${distube.setFilter(message, args[0]) || "Off"}`);
	}
};