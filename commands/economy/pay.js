const userDB = require("../../db/userDB");

module.exports = {
	name: "pay",
	description: "Pay someone (from wallet).",
	args: true,
	usage: "<user> <amount>",
	guildOnly: true,
	permission: "MANAGE_SERVER",
	async execute(message, args) {
		const { guild, mentions, author } = message;

		const userData = await userDB.get(author);
		if (userData.coins <= 0)
			return message.reply(":x: Not enough coins to pay");

		const target = mentions.members.first() || guild.members.cache.get(args[0]);
		if (!target)
			return message.reply(":x: User doesn't exist");
		if (target.bot)
			return message.reply(":x: You cannot pay bots");
		if (target.id === author.id)
			return message.reply(":x: You can't pay yourself");

		const coins = parseInt(args[1]);
		if (!coins || coins <= 0)
			return message.reply(":x: Amount must be a whole number");

		await userDB.set(author, { $inc: { coins: -coins }});
		await userDB.set(target, { $inc: { coins } });
		message.reply(`${target.displayName} successfully received ${coins}$`);
	}
};