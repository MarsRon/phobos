module.exports = {
	name: "quote",
	description: "Make a fake a quote by someone",
	args: true,
	usage: "<user> <quote>",
	guildOnly: true,
	execute(message, args) {
		const { channel, client, mentions } = message;
		const target = mentions.users.first() || client.users.cache.get(args.shift());
		if (!target)
			return message.reply(":x: User doesn't exist");
		channel.send({embed: {
			description: args.join(" "),
			color: 4404979,
			author: {
				name: target.user.tag,
				url: "https://phobos.marsron.repl.co",
				icon_url: target.user.displayAvatarURL({ dynamic: true })
			},
			footer: { text: "Sent | sometime" }
		}}).then(() =>
			message.delete()
		);
	}
};
