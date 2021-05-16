const Guild = require("../../db/guild");

module.exports = {
	name: "resume",
	description: "Resumes the currently playing song.",
	guildOnly: true,
	async execute(message) {
		const { client: { distube }, guild } = message;
		const queue = distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not playing music. Use** \`${(await Guild(guild.id)).get().prefix}play\`** to play some music!**`);
		distube.resume(message);
		message.reply("**Song resumed**");
	}
};
