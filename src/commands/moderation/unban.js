module.exports = {
	name: "unban",
	description: "Unban a user.",
	args: true,
	usage: "<userID> [reason]",
	guildOnly: true,
	permission: "BAN_MEMBERS",
	async execute(message, args) {
		const { members } = message.guild;
		const bans = await members.fetchBans();
		const user = bans.get(args.shift());
		if (!user)
			return message.reply(":x: User not found");

		members.unban(user, args.join(" "))
			.catch(e => console.log(`[command/unban] ${e}`));
		message.reply(`Successfully unbanned ${user.tag}`);
	}
};
