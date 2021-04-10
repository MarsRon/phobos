const userDB = require("../../db/userDB");

module.exports = {
	name: "withdraw",
	alias: ["wd"],
	description: "Withdraw coins from your bank.",
	args: true,
	usage: "<amount>",
	cooldown: 10,
	async execute(message, args) {
		const { author } = message;
		
		const userData = await userDB.get(author);
		if (userData.bank <= 0)
			return message.reply(":x: Not enough coins to deposit");

		let amount = userData.bank;
		if (args[0] !== "all") {
			let n = parseInt(args[0]);
			if (!n || n <= 0)
				return message.reply(":x: Withdraw amount must be a whole number");
			amount = Math.min(userData.bank, n);
		}

		await userDB.set(author, { $inc: { coins: amount, bank: -amount } });
		message.reply(`Withdrawn ${amount}$ from bank`);
	}
};