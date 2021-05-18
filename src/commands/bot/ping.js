const { timeToDHMS } = require("../../utils");

module.exports = {
	name: "ping",
	alias: ["uptime"],
	description: "Checks the bot's latency.",
	execute(message) {
		const { uptime, ws } = message.client;

		message.reply(":ping_pong: Pong!").then(msg => msg.edit({embed: {
			fields: [
				{ name: "Bot Latency", value: `${Date.now() - msg.createdTimestamp}ms` },
				{ name: "API Latency", value: `${Math.round(ws.ping)}ms` },
				{ name: "Uptime", value: timeToDHMS(uptime) }
			].map(field => ({ ...field, inline: true })),
			color: 4404979,
			author: {
				name: "Phobos",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}}));
	}
};
