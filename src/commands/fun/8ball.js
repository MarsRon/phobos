const answers = ["Yes.", "No.", "Maybe...", "Never.", "Ask again later."];
const { floor, random } = Math;

module.exports = {
	name: "8ball",
	alias: ["8b"],
	description: "Sends random response to your question.",
	args: true,
	usage: "<question>",
	execute(message, args) {
		message.reply({embed: {
			description: `Question: ${args.join(" ")}\nAnswer: ${answers[floor(random() * answers.length)]}`,
			color: 4404979,
			author: {
				name: "8Ball",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}});
	}
};
