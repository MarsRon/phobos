module.exports = client => {
	process.on("unhandledRejection", err => console.log(err));

	console.log(`${client.user.tag} is ready! ${new Date().toISOString().substr(11, 8)}`);
	client.user.setActivity(`${process.env.PREFIX}help | ${client.guilds.cache.size} Servers`, { type: "PLAYING" });

	// Fetch reaction role channel
	client.channels
		.fetch(process.env.REACTION_ROLE_CHANNEL)
		.then(channel => channel.messages.fetch());
};
