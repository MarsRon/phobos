const Guild = require("../../db/guild");

module.exports = {
	name: "set-welcome",
	description: "Sends welcome messages to a channel",
	args: true,
	usage: "<channel>",
	guildOnly: true,
	permission: "MANAGE_SERVER",
	cooldown: 5,
	async execute(message, args) {
		const { client, guild, mentions } = message;
		const gdb = await Guild(guild.id);

		if (args[0] === "reset") {
			gdb.set("welcomeChannel", "");
			return message.reply("Successfully removed welcome channel!");
		}

		const channel = mentions.channels.first() || client.channels.cache.get(args[0]);
		if (!channel)
			return message.reply(":x: Channel not found");

		gdb.set("welcomeChannel", channel.id);
		message.reply(`Successfully set <#${channel.id}> as the welcome channel!\nIf you wish to reset it, please run \`${gdb.get().prefix}set-welcome reset\``);
	}
};