module.exports = {
	name: "invite",
	description: "Shows Phobos's invite link!",
	execute(message) {
		const url = "https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8589934591";
		message.reply({embed: {
			description: `**[Click here](${url})** to invite me to your server!`,
			color: 4404979,
			author: {
				name: "Invite Phobos",
				url,
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}});
	}
};
