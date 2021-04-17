const Guild = require("../../db/guild");

module.exports = {
	name: "help",
	alias: ["phobos", "info"],
	description: "Shows all Phobos commands.",
	async execute(message) {
		const gdb = await Guild(message.guild.id);
		message.reply({embed: {
			color: 2793983,
			fields: [
				{ name: ":open_file_folder: Commands List", value: `\`${gdb.get().prefix}cmds <category|command>\``},
				{ name: ":white_check_mark: Help Page", value: "https://marsron.github.io/phobos/" },
				{ name: ":question: Arguments usage", value: "`<required>`, `[optional]`" },
				{ name: ":page_facing_up: Still need help?", value: "[**Click here**](https://discord.gg/TSqw3jx) to join our Discord server!" },
				{ name: ":sparkles: Invite me!", value: "[**Invite Phobos**](https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8589934591) to your server!", inline: true }
			],
			author: {
				name: "Phobos Help Page",
				url: "https://marsron.github.io/phobos/",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			},
			thumbnail: { url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=256" }
		}});
	}
};