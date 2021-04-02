const ownerId = process.env.OWNER_ID;

const catchers = [

	function imDad(message) {
		const { author, content } = message;
		if (author.id === ownerId) return;
		const match = /^i\s*('|`|a)?\s*m\s*/i.exec(content);
		if (match) {
			const text = content.slice(match[0].length).trim();
			message.reply(`Hi **${text === "" ? "blank" : text}**, I'm dad!`);
		}
	},

	function brrr(message) {
		if (message.content.toLowerCase().includes("brrr"))
			(async () => {
				try {
					await message.react("🏎️");
					await message.react("🇻");
					await message.react("🇷");
					await message.react("🇴");
					await message.react("🅾️");
					message.react("🇲");
				// eslint-disable-next-line no-empty
				} catch(e) {}
			})();
	}

];

module.exports = function(message) {
	catchers.forEach(func => func(message));
};