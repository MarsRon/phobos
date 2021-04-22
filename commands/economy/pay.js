const User = require("../../db/user");

module.exports = {
	name: "pay",
	description: "Pay someone (from wallet).",
	args: true,
	usage: "<user> <amount>",
	guildOnly: true,
	cooldown: 5,
	async execute(message, args) {
		const { guild, mentions, author } = message;

		const udb = await User(author.id);
		const { coins } = udb.get();
		if (coins <= 0)
			return message.reply(":x: Not enough coins in wallet to pay");

		const target = mentions.members.first() || guild.members.cache.get(args[0]);
		if (!target)
			return message.reply(":x: User doesn't exist");
		if (target.id === author.id)
			return message.reply(":x: You can't pay yourself");

		const amount = parseInt(args[1]);
		if (!amount || amount <= 0)
			return message.reply(":x: Amount must be a whole number");

		udb.inc("coins", -amount);
		(await User(target.id)).inc("coins", amount);
		message.reply(`**${target.displayName}** successfully received ${amount}$`);
	}
};
