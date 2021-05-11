module.exports = {
	name: "botinfo",
	description: "Shows information about Phobos.",
	execute(message) {
		const { commands, guilds, user, ws } = message.client;
		const uptime = message.client.uptime / 1000;
		message.reply({embed: {
			description: "Phobos was created by <@611166639534112769>, the <:cri:745563112106754129> champion.",
			fields: [
				{ name: "Tag", value: user.tag + " | " + user.id, inline: true },
				{ name: "Used by", value: guilds.cache.size + " Servers", inline: true },
				{ name: "Code", value: "Made with [Discord.js](http://discord.js.org) & [Node.js](https://nodejs.org)", inline: true },
				{ name: "Bot Ping", value: `Latency: ${Date.now()-message.createdTimestamp}ms\nAPI Latency: ${Math.round(ws.ping)}ms`, inline: true },
				{ name: "Commands", value: `${[...commands.values()].reduce((acc, cur) => acc + cur.size, 0)} Commands`, inline: true },
				{ name: "Prefix", value: `\`${process.env.PREFIX}\``, inline: true },
				{ name: "Developer", value: "MarsRon#7602 | <@611166639534112769>", inline: true },
				{ name: "Uptime", value: `${~~(uptime / 86400)}d ${~~(uptime / 3600) % 24}h ${~~(uptime / 60) % 60}m ${~~(uptime) % 60}s`, inline: true },
				{ name: "Links", value: "[Add Me](https://discord.com/oauth2/authorize?client_id=738252807525892139&scope=bot&permissions=8589934591) | [Join Server](https://discord.gg/TSqw3jx)", inline: true }
			],
			color: 2793983,
			author: {
				name: "Bot Information",
				url: "https://marsron.github.io/phobos/",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}});
	}
};
