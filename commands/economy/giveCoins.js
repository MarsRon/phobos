const User = require("../../db/user");

module.exports = {
	name: "give-coins",
	description: "Gives some coins to a user.",
	args: true,
	usage: "<user> <amount>",
	guildOnly: true,
	cooldown: 5,
	async execute(message, args) {
		const { author, guild, mentions } = message;
		if (author.id !== process.env.OWNER_ID) return;

		const target = mentions.members.first() || guild.members.cache.get(args[0]);
		if (!target)
			return message.reply(":x: User doesn't exist");

		const amount = parseInt(args[1]);
		if (!amount)
			return message.reply(":x: Amount must be a whole number");

		const udb = await User(target.id);
		udb.inc("coins", amount);
		message.reply(`**${target.displayName}** successfully received ${amount}$`);
	}
};
