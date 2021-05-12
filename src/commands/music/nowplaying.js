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
			color: 4404979,
			thumbnail: { url: thumbnail },
			author: {
				name: "Now Playing ♪",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}});
	}
};
