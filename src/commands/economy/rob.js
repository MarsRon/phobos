const User = require("../../db/user");

module.exports = {
	name: "rob",
	description: "Rob someone.",
	args: true,
	usage: "<user>",
	guildOnly: true,
	cooldown: 30,
	async execute(message, args) {
		const { guild, mentions, author } = message;

		const target = mentions.members.first() ||
			await guild.members.fetch(args[0]).catch(console.log);
		if (!target)
			return message.reply(":x: User doesn't exist");

		const [udb, targetUdb] = await Promise.all([User(author.id), User(target.id)]);

		if (targetUdb <= 0)
			return message.reply(":x: User doesn't have anything you can rob");

		const isVip = Object.keys(udb.get().inventory)
			.some(k => k.startsWith("vip"));

		// Punish those who rob themselves lmao
		if (target.id === author.id) {
			const robbed = Math.ceil(Math.random() * 100);
			udb.inc("coins", -robbed);
			return message.reply(`Congratulations, you lost **${robbed}$** because you're dumb and you robbed yourself <:hMmMmMm:748496754382733383>`);
		}

		const robbed = Math.min(
			Math.ceil(Math.random() * (isVip ? targetUdb.get().coins : 100)),
			targetUdb.get().coins
		);
		targetUdb.inc("coins", -robbed);
		udb.inc("coins", robbed);
		message.reply(`You robbed <@${target.id}> and got away with ${robbed}$`);
	}
};
