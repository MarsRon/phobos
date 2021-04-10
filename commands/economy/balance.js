const userDB = require("../../db/userDB");

module.exports = {
	name: "balance",
	alias: ["bal"],
	description: "Check your coin balance.",
	cooldown: 10,
	async execute(message) {
		const { author, member } = message;

		const { coins, bank } = await userDB.get(author);

		message.reply({embed: {
			fields: [
				{ name: "Wallet", value: `${coins}$`, inline: true },
				{ name: "Bank", value: `${bank}$`, inline: true },
				{ name: "Total", value: `${bank + coins}$`, inline: true },
			],
			color: 2793983,
			author: {
				name: `${member?.displayName || author.name}'s Balance`,
				url: "https://marsron.github.io",
				icon_url: author.displayAvatarURL({ dynamic: true })
			}
		}});
	}
};