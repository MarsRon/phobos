const prefix = process.env.PREFIX;

module.exports = {
	name: "help",
	alias: ["phobos"],
	description: "Shows all Phobos commands.",
	execute(message) {
		message.reply({embed: {
			color: 2793983,
			fields: [
				{ name: ":open_file_folder: Commands List", value: `\`${prefix}cmds <category|command>\``},
				{ name: ":white_check_mark: Help Page", value: "https://marsron.github.io/phobos/" },
				{ name: ":question: Arguments usage", value: "`<required>`, `[optional]`" },
				{ name: ":page_facing_up: Still need help?", value: "[**Click here**](https://discord.gg/TSqw3jx) to join our Discord server!" }
			],
			author: {
				name: "Phobos Commands",
				url: "https://marsron.github.io/phobos/",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			},
			thumbnail: { url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=256" }
		}});
	}
};