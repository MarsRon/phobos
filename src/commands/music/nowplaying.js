const Guild = require("../../db/guild");

module.exports = {
	name: "nowplaying",
	alias: ["np"],
	description: "Shows what song Phobos is currently playing.",
	guildOnly: true,
	async execute(message) {
		const gdb = await Guild(message.guild.id);

		const queue = message.client.distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not playing music. Use** \`${gdb.get().prefix}play\`** to play some music!**`);

		const { songs, formattedCurrentTime } = queue;
		const { name, url, formattedDuration, user, thumbnail } = songs[0];

		message.reply({embed: {
			description: `[${name}](${url})\n\n\`${formattedCurrentTime} / ${formattedDuration}\`\n\n\`Requested by:\` <@${user.id}> (${user.tag})`,
			color: 2793983,
			thumbnail: { url: thumbnail },
			author: {
				name: "Now Playing ♪",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			}
		}});
	}
};
