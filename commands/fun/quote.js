module.exports = {
	name: "quote",
	description: "Make a fake a quote by someone",
	args: true,
	usage: "<user> <quote>",
	guildOnly: true,
	execute(message, args) {
		const { guild, mentions } = message;
		const target = mentions.members.first() || guild.members.cache.get(args[0]);
		if (!target)
			return message.reply(":x: User doesn't exist");
		message.reply({embed: {
			description: args.slice(1).join(" "),
			color: 2793983,
			author: {
				name: target.user.tag,
				url: "https://marsron.github.io/phobos/",
				icon_url: target.user.displayAvatarURL({ dynamic: true })
			},
			footer: { text: "Sent | sometime" }
		}});
	}
};