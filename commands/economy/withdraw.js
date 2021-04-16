const User = require("../../db/user");

module.exports = {
	name: "withdraw",
	alias: ["wd"],
	description: "Withdraw coins from your bank.",
	args: true,
	usage: "<amount>",
	cooldown: 5,
	async execute(message, args) {
		const amount = args[0];

		const udb = await User(message.author.id);
		const { bank } = udb.get();
		if (bank <= 0)
			return message.reply(":x: Not enough coins to withdraw");

		let bankAmount = bank;
		if (!(amount === "a" || amount === "all")) {
			const n = parseInt(amount);
			if (!n || n <= 0)
				return message.reply(":x: Withdraw amount must be a whole number");
			bankAmount = Math.min(bank, n);
		}

		udb.inc("bank", -bankAmount);
		udb.inc("coins", bankAmount);
		message.reply(`Withdrawn ${bankAmount}$ from bank`);
	}
};