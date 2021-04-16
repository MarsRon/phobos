const User = require("../../db/user");

module.exports = {
	name: "deposit",
	alias: ["dep"],
	description: "Deposit coins into your bank from your wallet.",
	args: true,
	usage: "<amount>",
	cooldown: 5,
	async execute(message, args) {
		const amount = args[0];

		const udb = await User(message.author.id);
		const { coins } = udb.get();
		if (coins <= 0)
			return message.reply(":x: Not enough coins to deposit");

		let coinAmount = coins;
		if (!(amount === "a" || amount === "all")) {
			const n = parseInt(amount);
			if (!n || n <= 0)
				return message.reply(":x: Deposit amount must be a whole number");
			coinAmount = Math.min(coins, n);
		}

		udb.inc("coins", -coinAmount);
		udb.inc("bank", coinAmount);
		message.reply(`Deposited ${coinAmount}$ into bank`);
	}
};