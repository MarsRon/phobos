module.exports = {
	name: "nowplaying",
	alias: ["np"],
	description: "Shows what song Phobos is currently playing.",
	guildOnly: true,
	execute(message) {
		const queue = message.client.distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not connected to a voice channel. Type** \`${process.env.PREFIX}join\` **to get me in one**`);

		const { songs, formattedCurrentTime } = queue;
		const { name, url, formattedDuration, user, thumbnail } = songs[0];

		message.reply({embed: {
			description: `[${name}](${url})\n\n\`${formattedCurrentTime} / ${formattedDuration}\`\n\n\`Requested by:\` <@${user.id}> (${user.tag})`,
			color: 2793983,
			thumbnail: { url: thumbnail },
			author: {
				name: "Now Playing ♪",
				url: "https://marsron.github.io",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}});
	}
};