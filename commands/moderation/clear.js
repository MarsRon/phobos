module.exports = {
	name: "clear",
	alias: ["purge"],
	description: "Clears messages with a limit of 100.",
	args: true,
	usage: "<message_count 1-100>",
	guildOnly: true,
	permission: "MANAGE_MESSAGES",
	execute(message, args) {
		const { channel } = message;
		const limit = args[0];

		if (limit >= 1 && limit <= 100) {
			message.delete();
			channel.bulkDelete(limit, true)
				.then(messages =>
					channel.send(`Successfully deleted ${messages.array().length} messages`)
						.then(msg => msg.delete({timeout: 5000}).catch(() => {}))
				)
				.catch(err => {
					channel.send(":x: Something went wrong");
					console.log(err);
				});
		} else
			message.reply(":x: Please enter a number between 1 and 100");
	}
};