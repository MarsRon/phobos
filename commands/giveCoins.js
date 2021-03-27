const profileModel = require("../models/profileSchema");

module.exports = {
	name: "give-coins",
	description: "Give an amount of coins to user",
	args: true,
	usage: "<user> <amount>",
	guildOnly: true,
	permission: "MANAGE_SERVER",
	async execute(message, args) {
		const { guild, mentions } = message;

		const target = mentions.members.first() || guild.members.cache.get(args[0]);
		if (!target)
			return message.reply(":x: User doesn't exist");

		const coins = parseInt(args[1]);
		if (!coins)
			return message.reply(":x: Amount must be a whole number");

		try {
			const targetData = await profileModel.findOne({ userID: target.id });
			if (!targetData)
				return message.reply(":x: User doesn't exist in the database");

			await profileModel.findOneAndUpdate(
				{ userID: target.id },
				{ $inc: { coins } }
			);

			message.reply(`${target.displayName} received ${coins}$`);
		} catch(e) {
			console.log(e.message);
		}
	}
}