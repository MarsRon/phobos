const guildDB = require("../../db/guildDB");

module.exports = {
	name: "prefix",
	description: "Changes Phobos' prefix.",
	args: true,
	usage: "<prefix>",
	guildOnly: true,
	permission: "MANAGE_SERVER",
	cooldown: 10,
	async execute(message, args) {
		const { guild } = message;

		if (args[0] === "reset") {
			await guildDB.set(guild, { $set: { prefix: process.env.PREFIX } });
			return message.reply(`Successfully reset prefix to \`${process.env.PREFIX}\``);
		}

		const prefix = args[0].slice(0, 5);

		await guildDB.set(guild, { $set: { prefix } });
		message.reply(`Successfully set \`${prefix}\` as Phobos' prefix!\nIf you wish to reset it, please run \`${prefix}prefix reset\``);
	}
};