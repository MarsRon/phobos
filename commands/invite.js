module.exports = {
	name: "invite",
	description: "Invite the bot to your server.",
	execute(message) {
		const url = "https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=2147483647";
		message.reply({embed: {
			description: `**[Click here](${url})** to invite me to your server!`,
			color: 2793983,
			author: {
				name: "Invite Phobos",
				url,
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}});
	}
}