const Guild = require("../../db/guild");

const { getStoreList } = require("../../const/economyStore");

module.exports = {
	name: "store",
	description: "Lists items for sale in the store.",
	async execute(message) {
		const { prefix } = (await Guild(message.guild?.id)).get();
		message.reply({embed: {
			description: `To buy an item, run \`${prefix}buy <key>\`\nThe key is the text inside \`codeblocks\``,
			fields: getStoreList(),
			color: 4404979,
			author: {
				name: "Phobos Store",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}});
	}
};
