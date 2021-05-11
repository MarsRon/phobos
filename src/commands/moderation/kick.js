module.exports = {
	name: "kick",
	description: "Kic a user.",
	args: true,
	usage: "<user> [reason]",
	guildOnly: true,
	permission: "KICK_MEMBERS",
	async execute(message, args) {
		const { guild, mentions } = message;

		const member = mentions.members.first() || guild.members.cache.get(args.shift());
		if (!member)
			return message.reply(":x: You need to specify the user!");

		member
			.kick({ reason: args.join(" ") })
			.then(() => message.reply(`Successfully kicked ${member.user.tag}`))
			.catch(e => console.log(e.message));
	}
};
