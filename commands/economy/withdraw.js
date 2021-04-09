const userDB = require("../../db/userDB");

module.exports = {
	name: "withdraw",
	alias: ["wd"],
	description: "Withdraw coins from your bank.",
	args: true,
	usage: "<amount>",
	async execute(message, args) {
		const { author } = message;
		
		let amount = parseInt(args[0]);

		if (!amount || amount <= 0)
			return message.reply(":x: Withdraw amount must be a whole number");

		const userData = await userDB.get(author);

		if (userData.bank <= 0)
			return message.reply(":x: Not enough coins to withdraw");

		amount = Math.min(amount, userData.bank);

		await userDB.set(author, { $inc: { coins: amount, bank: -amount } });
		message.reply(`Withdrawn ${amount}$ from bank`);
	}
};