module.exports = {
	name: "ban",
	description: "Ban a user.",
	args: true,
	usage: "<user> [reason]",
	guildOnly: true,
	permission: "BAN_MEMBERS",
	execute(message, args) {
		const { guild, mentions } = message;

		const member = mentions.members.first() || guild.members.cache.get(args.shift());
		if (!member)
			return message.reply(":x: You need to specify the user!");

		member
			.ban({ reason: args.join(" ") })
			.then(() => message.reply(`Successfully banned ${member.user.tag}`))
			.catch(e => console.log(e.message));
	}
};
