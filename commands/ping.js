module.exports = {
	name: "ping",
	description: "Returns bot latency and passed arguments",
	execute(message, args) {
		message.reply({embed: {
			title: ":ping_pong: Pong!",
			fields: [
				{ name: "Bot Latency", value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
				{ name: "Arguments passed", value: args.length ? `\`${args.join("`, `")}\`` : "None", inline: true }
			],
			color: 2793983,
			author: {
				name: "Phobos",
				url: "https://marsron.github.io",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}});
	}
}