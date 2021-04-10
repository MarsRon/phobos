module.exports = {
	name: "ping",
	description: "Checks the bot's latency.",
	execute(message, args) {
		const { client, createdTimestamp } = message;

		const uptime = client.uptime / 1000;

		message.reply({embed: {
			title: ":ping_pong: Pong!",
			fields: [
				{ name: "Bot Latency", value: `${Date.now() - createdTimestamp}ms`, inline: true },
				{ name: "Uptime", value: `${~~(uptime / 86400)}d ${~~(uptime / 3600) % 24}h ${~~(uptime / 60) % 60}m ${~~(uptime) % 60}s`, inline: true },
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
};