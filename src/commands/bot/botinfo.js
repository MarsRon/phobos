const { timeToDHMS } = require("../../utils");

module.exports = {
	name: "botinfo",
	description: "Displays information about Phobos.",
	execute(message) {
		const { aliases, commands, guilds, uptime, user, ws } = message.client;
		message.reply({embed: {
			description: "Phobos was created by <@611166639534112769>, the <:cri:745563112106754129> champion.",
			fields: [
				{ name: "Tag", value: user.tag + " | " + user.id },
				{ name: "Used by", value: guilds.cache.size + " Servers" },
				{ name: "Open-source Code", value: "Fork me on [GitHub](https://github.com/MarsRon/phobos#readme)!" },
				{ name: "Bot Ping", value: `Latency: ${Date.now() - message.createdTimestamp}ms\nAPI Latency: ${Math.round(ws.ping)}ms` },
				{ name: "Commands", value: `${[...commands.values()].reduce((a, c) => a + c.size, 0)} Commands | ${aliases.size} Aliases` },
				{ name: "Prefix", value: `\`${process.env.PREFIX}\`` },
				{ name: "Developer", value: "MarsRon#7602 | <@611166639534112769>" },
				{ name: "Uptime", value: timeToDHMS(uptime) },
				{ name: "Links", value: "[Add Me](https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8589934591) | [Join Server](https://discord.gg/TSqw3jx)" }
			].map(field => ({ ...field, inline: true })),
			color: 4404979,
			author: {
				name: "Bot Information",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}});
	}
};
