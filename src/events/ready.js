module.exports = client => {
	process.on("unhandledRejection", console.log);

	console.log(`[event/ready] ${client.user.tag} is online`);
	client.user.setActivity(`${process.env.PREFIX}help | ${client.guilds.cache.size} Servers`, { type: "PLAYING" });

	// Fetch reaction role channel
	client.channels
		.fetch(process.env.REACTION_ROLE_CHANNEL)
		.then(channel => channel.messages.fetch());
};
