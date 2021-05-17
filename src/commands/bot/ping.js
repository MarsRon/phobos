module.exports = {
	name: "ping",
	alias: ["uptime"],
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
			color: 4404979,
			author: {
				name: "Phobos",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}}));
	}
};
