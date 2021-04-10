const userDB = require("../../db/userDB");

function processInventory(inventory) {
	let inv = [];
	for (const item of inventory.values())
		inv.push(item);
	return inv.length ? inv : "\\*empty\\*";
}

module.exports = {
	name: "inventory",
	alias: ["inv"],
	description: "Check your inventory or a user's.",
	usage: "[user]",
	cooldown: 10,
	async execute(message, args) {
		const { author, guild, member, mentions } = message;

		let targetMember = member, targetUser = author;

		if (args[0]) {
			const target = mentions.members.first() || guild.members.cache.get(args[0]);
			if (!target)
				return message.reply(":x: User doesn't exist");
			targetUser = target.user, targetMember = target;
		}

		const { inventory } = await userDB.get(targetUser);

		message.reply({embed: {
			description: processInventory(inventory),
			color: 2793983,
			author: {
				name: `${targetMember?.displayName || targetUser.name}'s Inventory`,
				url: "https://marsron.github.io",
				icon_url: targetUser.displayAvatarURL({ dynamic: true })
			}
		}});
	}
};