module.exports = {
	name: "kick",
	description: "Kic a user.",
	args: true,
	usage: "<user> [reason]",
	guildOnly: true,
	permission: "KICK_MEMBERS",
	execute(message, args) {
		const { guild, mentions } = message;

		const member = mentions.members.first() || guild.members.cache.get(args.shift());
		if (!member)
			return message.reply(":x: You need to specify the user!");

		member.kick({ reason: args.join(" ") })
			.catch(e => console.log(e.message));
		message.reply(`Successfully kicked ${member.user.tag}`);
	}
};
