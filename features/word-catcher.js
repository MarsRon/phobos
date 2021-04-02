const catchers = [
	async function imDad(message) {
		const { content } = message;
		const match = /^i\s*('|a)?\s*m\s*/gi.exec(content);
		if (match) {
			const text = content.slice(match[0].length).trim();
			message.reply(`Hi **${text === "" ? "blank" : text}**, I'm dad!`);
		}
	},

	async function brrr(message) {
		if (message.content.toLowerCase().includes("brrr")) {
			try {
				await message.react("🏎️");
				await message.react("🇻");
				await message.react("🇷");
				await message.react("🇴");
				await message.react("🅾️");
				message.react("🇲");
			} catch(e) {
				console.log(`Error reacting to message ${message.id}`);
			}
		}
	}
];

module.exports = function(message) {
	catchers.forEach(func => func(message));
};