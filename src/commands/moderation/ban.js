module.exports = {
	name: "ban",
	description: "Ban a user.",
	args: true,
	usage: "<user> [reason]",
	guildOnly: true,
	permission: "BAN_MEMBERS",
	execute(message, args) {
		const { guild, mentions } = message;

		const member = mentions.members.first() || guild.members.cache.get(args[0]);
		if (!member)
			return message.reply(":x: You need to specify the user!");

		member
			.ban({ reason: args.slice(1).join(" ") })
			.then(() => message.reply(`Successfully banned ${member.user.tag}`))
			.catch(e => console.log(e.message));
	}
};
