const profileModel = require("../models/profileSchema");
const { ceil, random } = Math;

module.exports = {
	name: "beg",
	description: "Beg for coins",
	async execute(message) {
		const coins = ceil(random() * 500);
		await profileModel.findOneAndUpdate(
			{ userID: message.author.id },
			{ $inc: { coins } }
		);
		message.reply(`You begged and received $${coins}!`);
	}
}