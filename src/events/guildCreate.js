module.exports = (client, guild) => {
	client.user.setActivity(`${process.env.PREFIX}help | ${client.guilds.cache.size} Servers`, { type: "PLAYING" });
	console.log(`[event/guildCreate] Added guild ${guild.name}`);
};
