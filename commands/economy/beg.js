const userDB = require("../../db/userDB");

module.exports = {
	name: "beg",
	description: "Beg for coins. You'll get 1-50 coins each time you beg.",
	cooldown: 10,
	async execute(message) {
		const coins = Math.round(Math.ceil(Math.random() * 50) * userDB.get(message.author).multiplier);
		await userDB.set(message.author, { $inc: { coins } });
		message.reply(`You begged and received ${coins}$!`);
	}
};