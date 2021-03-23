const catchers = [
	async function imDad(message) {
		const { channel, content } = message;
		const match = /^i\s*('|a)?\s*m\s*/gi.exec(content);
		if (match) {
			const text = content.slice(match[0].length).trim();
			channel.send(`Hi **${text === "" ? "blank" : text}**, I'm dad!`);
		}
	},

	async function brrr(message) {
		if (message.content.toLowerCase().includes("brrr")) {
			await message.react("🏎️");
			await message.react("🇻");
			await message.react("🇷");
			await message.react("🇴");
			await message.react("🅾️");
			message.react("🇲");
		}
	}
];

module.exports = function(message) {
	catchers.forEach(func => func(message));
}