const Guild = require("../db/guild");

module.exports = async (client, member) => {
	const { guild, user } = member;
	const { welcomeChannel } = (await Guild(guild.id)).get();

	// Welcome Message
	const channel = welcomeChannel !== "" && guild.channels.cache.get(welcomeChannel);
	if (channel) {
		let description = `Hey <@${user.id}>, welcome to **${guild.name}**!`;
		if (channel.id === process.env.WELCOME_CHANNEL)
			description += "\nDon't forget to read <#728979803172110386> too.";
		channel.send({embed: {
			title: `Welcome, ${user.tag}`,
			description,
			color: 4404979,
			thumbnail: { url: user.displayAvatarURL({ dynamic: true, size: 256 }) }
		}});
	}
};
