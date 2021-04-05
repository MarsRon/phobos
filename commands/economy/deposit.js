const getProfileData = require("../../features/getProfileData");
const profileModel = require("../../models/profileSchema");

module.exports = {
	name: "deposit",
	alias: ["dep"],
	description: "Deposit coins into your bank",
	args: true,
	usage: "<amount>",
	async execute(message, args) {
		let amount = parseInt(args[0]);

		if (!amount || amount <= 0)
			return message.reply(":x: Deposit amount must be a whole number");

		const profileData = await getProfileData(message.author);

		if (profileData.coins <= 0)
			return message.reply(":x: Not enough coins to deposit");

		amount = Math.min(amount, profileData.coins);

		try {
			await profileModel.findOneAndUpdate(
				{ userID: message.author.id },
				{ $inc: {
					coins: -amount,
					bank: amount
				} }
			);
			message.reply(`Deposited ${amount}$ into bank`);
		} catch(e) {
			console.log(e.message);
		}
	}
};