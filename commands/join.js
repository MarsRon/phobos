const queue = require("../features/musicQueue");

module.exports = {
	name: "join",
	alias: ["summon"],
	description: "Summons the bot to the voice channel you are in",
	guildOnly: true,
	execute(message) {
		const { channel, guild, member: { voice } } = message;

		return new Promise((resolve, reject) => {
			if (!voice.channelID)
				return message.reply(":x: You have to be in a voice channel to use this command");

			let guildQueue = queue.get(guild.id);
			if (guildQueue === undefined) {
				guildQueue = {
					playing: false,
					channel: voice.channelID,
					cmdsChannel: channel.id,
					songs: []
				}
				queue.set(guild.id, guildQueue);
			}

			if (guildQueue.cmdsChannel !== channel.id)
				return message.reply(`:x: **Please go to <#${guildQueue.cmdsChannel}> to use this command**`);

			voice.channel.join()
				.then(connection => {
					queue.set(guild.id, { ...guildQueue, connection });
					channel.send(`:thumbsup: **Joined ${connection.channel.name} and bound to** <#${channel.id}>`);
					resolve(connection);
				})
				.catch(reject);
		});
	}
}