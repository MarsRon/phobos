const getProfileData = require("../../features/getProfileData");
const profileModel = require("../../models/profileSchema");

module.exports = {
	name: "withdraw",
	alias: ["wd"],
	description: "Withdraw coins from your bank",
	args: true,
	usage: "<amount>",
	async execute(message, args) {
		let amount = parseInt(args[0]);

		if (!amount || amount <= 0)
			return message.reply(":x: Withdraw amount must be a whole number");

		const profileData = await getProfileData(message.author.id);

		if (profileData.bank <= 0)
			return message.reply(":x: Not enough coins to withdraw");

		amount = Math.min(amount, profileData.bank);

		try {
			await profileModel.findOneAndUpdate(
				{ userID: message.author.id },
				{ $inc: {
					coins: amount,
					bank: -amount
				} }
			);
			message.reply(`Withdrawn ${amount}$ from bank`);
		} catch(e) {
			console.log(e.message);
		}
	}
};