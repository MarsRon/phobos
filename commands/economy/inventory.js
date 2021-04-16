const User = require("../../db/user");

function processInventory(inventory) {
	const inv = Array.from(inventory);
	return inv.length > 0 ? inv : "\\*empty\\*";
}

module.exports = {
	name: "inventory",
	alias: ["inv"],
	description: "Check your inventory or a user's.",
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
		const { inventory } = udb.get();

		message.reply({embed: {
			description: processInventory(inventory),
			color: 2793983,
			author: {
				name: `${targetMember?.displayName || targetUser.name}'s Inventory`,
				url: "https://marsron.github.io/phobos/",
				icon_url: targetUser.displayAvatarURL({ dynamic: true })
			}
		}});
	}
};