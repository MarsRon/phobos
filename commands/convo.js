const answers = {
	get random() {
		return Math.ceil(Math.random() * 10);
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
		const filter = response => response.author.id === author.id;

		channel.send(`Choose from \`${Object.keys(answers).join("`, `")}\` to continue the conversation`);
		channel.send("Hello there!");
		
		function convo() {
			channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
				.then(collected => {
					const response = collected.first().content.toLowerCase();
					if (answers[response])
						channel.send(answers[response]);
					if (response !== "bye") convo();
				})
				.catch(() => channel.send("Nobody wants to talk to me \:("));
		}
		convo();
	}
}