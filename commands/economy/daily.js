const User = require("../../db/user");

module.exports = {
	name: "daily",
	description: "Get your daily free coins.",
	cooldown: 86400, // 24 hours
	async execute(message) {
		const udb = await User(message.author.id);
		const { lastDaily, multiplier } = udb.get();

		const now = Date.now(),
			expirationTime = lastDaily + 86400000;
		let timeLeft = (expirationTime - now) / 1000;

		if (timeLeft > 0) {
			let timeStr = "";
			if (timeLeft >= 60) {
				if (timeLeft >= 3600) {
					timeStr += ~~(timeLeft / 3600) + " hour(s) ";
					timeLeft %= 3600;
				}
				timeStr += ~~(timeLeft / 60) + " minute(s) ";
				timeLeft %= 60;
			}
			timeStr += timeLeft.toFixed(0);
			return message.reply(`:x: Please wait ${timeStr} second(s) before reusing this command`);
		}

		const coins = Math.round(200 * multiplier);
		udb.inc("coins", coins);
		udb.set("lastDaily", now);
		message.reply(`You received ${coins}$! Run this command everyday to get your free coins!`);
	}
};
