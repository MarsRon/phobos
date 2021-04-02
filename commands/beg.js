const profileModel = require("../models/profileSchema");
const { ceil, random } = Math;

module.exports = {
	name: "beg",
	description: "Beg for coins",
	async execute(message) {
		const coins = ceil(random() * 50);
		try {
			await profileModel.findOneAndUpdate(
				{ userID: message.author.id },
				{ $inc: { coins } }
			);
			message.reply(`You begged and received ${coins}$!`);
		} catch(e) {
			console.log(e.message);
		}
	}
};