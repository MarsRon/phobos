module.exports = {
	name: "ping",
	description: "Checks the bot's latency.",
	execute(message) {
		const { client, createdTimestamp } = message;

		const uptime = client.uptime / 1000;

		message.reply(":ping_pong: Pong!").then(msg => msg.edit({embed: {
			fields: [
				{ name: "Bot Latency", value: `${Date.now() - createdTimestamp}ms`, inline: true },
				{ name: "API Latency", value: `${Math.round(client.ws.ping)}ms`, inline: true },
				{ name: "Uptime", value: `${~~(uptime / 86400)}d ${~~(uptime / 3600) % 24}h ${~~(uptime / 60) % 60}m ${~~(uptime) % 60}s`, inline: true }
			],
			color: 2793983,
			author: {
				name: "Phobos",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}}));
	}
};
