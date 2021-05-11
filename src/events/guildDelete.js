module.exports = async (client, guild) => {
	client.user.setActivity(`${process.env.PREFIX}help | ${client.guilds.cache.size} Servers`, { type: "PLAYING" });
	console.log(guild.name);
};
