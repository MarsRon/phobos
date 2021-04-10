module.exports = {
	name: "botinfo",
	description: "Shows information about Phobos.",
	execute(message) {
		message.reply({embed: {
			description: "Phobos was created by <@611166639534112769>, the <:cri:745563112106754129> champion.\n**[Click here](https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8589934591)** to invite me to your server!",
			color: 2793983,
			author: {
				name: "Bot Information",
				url: "https://marsron.github.io/phobos/",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}});
	}
};