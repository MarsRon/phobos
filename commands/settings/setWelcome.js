const guildDB = require("../../db/guildDB");

module.exports = {
	name: "set-welcome",
	description: "Sends welcome messages to a channel",
	args: true,
	usage: "<channel>",
	guildOnly: true,
	permission: "MANAGE_SERVER",
	cooldown: 10,
	async execute(message, args) {
		const { client, guild, mentions } = message;

		if (args[0] === "reset") {
			await guildDB.set(guild, { $set: { welcomeChannel: "" } });
			return message.reply("Successfully removed welcome channel!");
		}

		const channel = mentions.channels.first() || client.channels.cache.get(args[0]);
		if (!channel)
			return message.reply(":x: Channel not found");

		await guildDB.set(guild, { $set: { welcomeChannel: channel.id } });
		message.reply(`Successfully set <#${channel.id}> as the welcome channel!\nIf you wish to reset it, please run \`${(await guildDB.get(guild)).prefix}set-welcome reset\``);
	}
};