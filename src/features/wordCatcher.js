const catchers = [

	function imDad(message, text) {
		const match = text.match(/^i\s*['`a]?\s*m\s*/);
		if (match)
			message.reply(`Hi **${message.content.slice(match[0].length) || "blank"}**, I'm dad!`);
	},

	async function brrr(message, text) {
		if (text.includes("brrr"))
			try {
				for (const emoji of ["🏎️", "🇻", "🇷", "🇴", "🅾", "🇲"])
					await message.react(emoji);
			} // eslint-disable-next-line no-empty
			catch {}
	},

	function normal(message, text) {
		const words = [
			// Note: Please put "not?\s*<keyword>" first before "<keyword>"
			[/not?\s*sad/, "Yes, be happy! \\:)"],
			[/sad/, "Don't be sad, I'm here for you \\:)"],
			[/not?\s*nice/, "Not nice \\:("],
			[/nice/, "Nice"],
			[/shut|stfu/, "shut"],
			[/\b(?:yo)?u\s+suck?/, "no u"],
			[/\bn(?:o+|u+)b/, "<:unoreverse:835873190638649426>"],
			[/<@!?738252807525892139>/, "why ping me"],
			[/phobos/, "who called me"],
		];
		const match = words.find(kv => kv[0].test(text));
		if (match)
			message.reply(match[1]);
	},

];

module.exports = async message => {
	const text = message.content.toLowerCase();
	catchers.forEach(func => func(message, text));
};
