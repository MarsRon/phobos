module.exports = async ({ guilds, user }) => {
	console.log(`[event/ready] ${user.tag} is online`);
	user.setActivity(`${process.env.PREFIX}help | ${guilds.cache.size} Servers`, { type: "PLAYING" });
};
