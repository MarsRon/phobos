const answers = {
	get random() {
		return `Random number: ${Math.ceil(Math.random() * 10)}`;
	},
	hello: "Nice to meet ya",
	hi: "why cant you type \"hello\"",
	haha: "Not. Funny.",
	bye: "Cya next time"
}

module.exports = {
	name: "convo",
	description: "Have a conversation with me",
	execute(message) {
		const { author, channel } = message;
		const filter = response => response.author.id === author.id && answers[response.content.toLowerCase()];

		message.reply(`Choose from \`${Object.keys(answers).join("`, `")}\` to continue the conversation`);
		channel.send("Hello there!");

		function convo() {
			channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
				.then(collected => {
					const msg = collected.first();
					const response = msg.content.toLowerCase();
					msg.reply(answers[response]);
					if (response !== "bye") convo();
				})
				.catch(() => channel.send("Nobody wants to talk to me \:("));
		}
		convo();
	}
}