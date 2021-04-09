const userDB = require("../../db/userDB");

module.exports = {
	name: "beg",
	description: "Beg for coins. You'll get 1-50 coins each time you beg.",
	async execute(message) {
		const coins = Math.ceil(Math.random() * 50);
		await userDB.set(message.author, { $inc: { coins } });
		message.reply(`You begged and received ${coins}$!`);
	}
};