module.exports = {
	name: "uptime",
	description: "Shows how long Phobos has been online.",
	execute(message) {
		const uptime = message.client.uptime / 1000;
		message.reply({embed: {
			description: `${~~(uptime / 86400)}d ${~~(uptime / 3600) % 24}h ${~~(uptime / 60) % 60}m ${~~(uptime) % 60}s`,
			color: 4404979,
			author: {
				name: "Uptime",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}});
	}
};
