const userDB = require("../../db/userDB");

module.exports = {
	name: "daily",
	description: "Get your daily free coins.",
	cooldown: 86400, // 24 hours
	async execute(message) {
		const coins = Math.round(300 * (await userDB.get(message.author)).multiplier);
		await userDB.set(message.author, { $inc: { coins } });
		message.reply(`You received ${coins}$! Run this command everyday to get your free coins!`);
	}
};