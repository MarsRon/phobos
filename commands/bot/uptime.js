module.exports = {
	name: "uptime",
	description: "Shows how long Phobos has been online.",
	execute(message) {
		const uptime = message.client.uptime / 1000;
		message.reply({embed: {
			description: `${~~(uptime / 86400)}d ${~~(uptime / 3600) % 24}h ${~~(uptime / 60) % 60}m ${~~(uptime) % 60}s`,
			color: 2793983,
			author: {
				name: "Uptime",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}});
	}
};
