const User = require("../../db/user");

module.exports = {
	name: "beg",
	description: "Beg for coins. You'll get 1-50 coins each time you beg.",
	cooldown: 15,
	async execute(message) {
		const udb = await User(message.author.id);
		const coins = Math.round(Math.ceil(Math.random() * 50) * udb.get().multiplier);
		udb.inc("coins", coins);
		message.reply(`You begged and received ${coins}$!`);
	}
};