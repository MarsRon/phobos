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

		const userData = await userDB.get(author);
		if (userData.coins <= 0)
			return message.reply(":x: Not enough coins to deposit");

		let amount = userData.coins;
		if (args[0] !== "all") {
			let n = parseInt(args[0]);
			if (!n || n <= 0)
				return message.reply(":x: Deposit amount must be a whole number");
			amount = Math.min(userData.coins, n);
		}

		await userDB.set(author, { $inc: { coins: -amount, bank: amount } });
		message.reply(`Deposited ${amount}$ into bank`);
	}
};