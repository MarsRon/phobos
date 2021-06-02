const Guild = require("../../db/guild");

const users = new Map();

const answers = {
	get random() {
		return `Random number: ${Math.ceil(Math.random() * 10)}`;
	},
	hello: "Nice to meet ya",
	hi: "why cant you type \"hello\"",
	haha: "Not. Funny.",
	bye: "Cya next time"
};

module.exports = {
	name: "convo",
	description: "Have a conversation with me.",
	async execute(message) {
		const { author, channel, guild } = message;

		if (users.has(author.id))
			return message.reply(`:x: You are already using \`${(await Guild(guild?.id)).get().prefix}convo\``);
		users.set(author.id, message.id);

		const filter = response => //eslint-disable-next-line no-prototype-builtins
			response.author.id === author.id && answers.hasOwnProperty(response.content.toLowerCase());

		message.reply(`Choose from \`${Object.keys(answers).join("`, `")}\` to continue the conversation`);
		channel.send("Hello there!");

		//eslint-disable-next-line no-constant-condition
		while (true) {
			try {
				const msg = (await channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })).first();
				// Message Partial
				if (message.partial)
					try {
						await message.fetch();
					} catch(e) {
						return console.log("[event/message] Message Partial error", e);
					}
				const response = msg.content.toLowerCase();
				msg.reply(answers[response]);
				if (response === "bye") break;
			} catch(e) {
				channel.send("Nobody wants to talk to me \\:(");
				break;
			}
		}
		users.delete(author.id);
	}
};
