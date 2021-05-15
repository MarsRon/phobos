const Guild = require("../../db/guild");

module.exports = {
	name: "skip",
	alias: ["s"],
	description: "Skips the current playing song.",
	guildOnly: true,
	async execute(message) {
		const { client: { distube }, guild } = message;
		const queue = distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not playing music. Use** \`${(await Guild(guild.id)).get().prefix}play\`** to play some music!**`);
		distube.skip(message);
		message.reply("**Skipped song**");
	}
};
