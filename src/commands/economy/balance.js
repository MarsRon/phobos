const User = require("../../db/user");

module.exports = {
	name: "balance",
	alias: ["bal"],
	description: "Check your coin balance or a user's.",
	usage: "[user]",
	cooldown: 5,
	async execute(message, args) {
		const { author, guild, member, mentions } = message;

		let targetMember = member, targetUser = author;
		if (args[0]) {
			const target = mentions.members.first() || guild.members.cache.get(args[0]);
			if (!target)
				return message.reply(":x: User doesn't exist");
			targetUser = target.user, targetMember = target;
		}

		const udb = await User(targetUser.id);
		const { coins, bank } = udb.get();

		message.reply({embed: {
			fields: [
				{ name: "Wallet", value: `${coins}$`, inline: true },
				{ name: "Bank", value: `${bank}$`, inline: true },
				{ name: "Total", value: `${bank + coins}$`, inline: true },
			],
			color: 2793983,
			author: {
				name: `${targetMember?.displayName || targetUser.username}'s Balance`,
				url: "https://marsron.github.io/phobos/",
				icon_url: targetUser.displayAvatarURL({ dynamic: true })
			}
		}});
	}
};
