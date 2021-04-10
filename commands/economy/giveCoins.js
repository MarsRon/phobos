const userDB = require("../../db/userDB");

module.exports = {
	name: "give-coins",
	description: "Gives some coins to a user.",
	args: true,
	usage: "<user> <amount>",
	guildOnly: true,
	permission: "MANAGE_SERVER",
	async execute(message, args) {
		const { guild, mentions } = message;

		const target = mentions.members.first() || guild.members.cache.get(args[0]);
		if (!target)
			return message.reply(":x: User doesn't exist");

		const coins = parseInt(args[1]);
		if (!coins)
			return message.reply(":x: Amount must be a whole number");

		await userDB.set(target, { $inc: { coins } });
		message.reply(`${target.displayName} received ${coins}$`);
	}
};