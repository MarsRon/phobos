module.exports = {
	name: "serverinfo",
	description: "Sends information about the server",
	guildOnly: true,
	execute(message) {
		const { guild } = message;
		const { name, region, memberCount, ownerID, channels } = guild;

		message.reply({embed: {
			title: `${name}`,
			fields: [
				{ name: "Members", value: memberCount, inline: true },
				{ name: "Owner", value: `<@${ownerID}>`, inline: true },
				{ name: "Region", value: region, inline: true },
				{ name: "Channel Count", value: channels.cache.size, inline: true }
			],
			color: 2793983,
			image: { url: guild.bannerURL({ size: 4096 }) },
			thumbnail: { url: guild.iconURL({ dynamic: true, size: 4096 })}
		}});
	}
};