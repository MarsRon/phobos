const Guild = require("../../db/guild");

module.exports = {
	name: "help",
	alias: ["phobos", "info"],
	description: "Bring up the help message.",
	async execute(message) {
		const gdb = await Guild(message.guild?.id);
		message.reply({embed: {
			color: 4404979,
			fields: [
				{ name: ":open_file_folder: Commands List", value: `\`${gdb.get().prefix}cmds <category|command>\``},
				{ name: ":white_check_mark: Help Page", value: "https://phobos.marsron.repl.co" },
				{ name: ":question: Arguments usage", value: "`<required>`, `[optional]`" },
				{ name: ":page_facing_up: Still need help?", value: "[**Click here**](https://discord.gg/TSqw3jx) to join our Discord server!" },
				{ name: ":sparkles: Invite me!", value: "[**Invite Phobos**](https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8589934591) to your server!", inline: true }
			],
			author: {
				name: "Phobos Help Page",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			},
			thumbnail: { url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=256" }
		}});
	}
};
