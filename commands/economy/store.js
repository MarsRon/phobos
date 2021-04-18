const Guild = require("../../db/guild");

const { getStoreList } = require("../../const/economyStore");

module.exports = {
	name: "store",
	description: "Lists items for sale in the store.",
	async execute(message) {
		const gdb = await Guild(message.guild?.id);
		const { prefix } = gdb.get();
		message.reply({embed: {
			description: `To buy an item, run \`${prefix}buy <key>\`\nThe key is the text inside \`codeblocks\``,
			fields: getStoreList(),
			color: 2793983,
			author: {
				name: "Phobos Store",
				url: "https://marsron.github.io/phobos/",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}});
	}
};