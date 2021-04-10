const userDB = require("../../db/userDB");

module.exports = {
	name: "deposit",
	alias: ["dep"],
	description: "Deposit coins into your bank from your wallet.",
	args: true,
	usage: "<amount>",
	cooldown: 10,
	async execute(message, args) {
		const { author } = message;

		let amount = parseInt(args[0]);

		if (!amount || amount <= 0)
			return message.reply(":x: Deposit amount must be a whole number");

		const userData = await userDB.get(author);

		if (userData.coins <= 0)
			return message.reply(":x: Not enough coins to deposit");

		amount = Math.min(amount, userData.coins);

		await userDB.set(author, { $inc: { coins: -amount, bank: amount } });
		message.reply(`Deposited ${amount}$ into bank`);
	}
};