module.exports = {
	name: "poop",
	alias: ["💩"],
	description: "Poop 💩",
	execute(message) {
		message.react("💩");
		message.reply("Poop 💩").then(m => m.react("💩"));
	}
};
