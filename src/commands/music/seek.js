const Guild = require("../../db/guild");

module.exports = {
	name: "seek",
	description: "Seek to a specific time of the currently playing song.",
	args: true,
	usage: "<seconds>",
	guildOnly: true,
	async execute(message, args) {
		const { client: { distube }, guild } = message;
		const queue = distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not playing music. Use** \`${(await Guild(guild.id)).get().prefix}play\`** to play some music!**`);

		const time = parseInt(args.shift());
		const duration = queue.songs[0].duration;
		if (time < 0 || time > duration)
			return message.reply(`:x: Please enter a number between 0 and ${duration}`);
		
		distube.seek(message, time*1000);
		message.reply(`Seeked to ${time} seconds`);
	}
};
