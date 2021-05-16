const catchers = [

	function imDad(message, text) {
		const match = text.match(/^i\s*['`a]?\s*m\s*([\s\S]*)/);
		if (match)
			message.reply(`Hi **${match[1] === "" ? "blank" : match[1]}**, I'm dad!`);
	},

	async function brrr(message, text) {
		if (text.includes("brrr"))
			try {
				for (const emoji of ["🏎️", "🇻", "🇷", "🇴", "🅾", "🇲"])
					await message.react(emoji);
			} // eslint-disable-next-line no-empty
			catch(e) {console.log(e);}
	},

	function normal(message, text) {
		const words = new Map([
			[/sad/, "Don't be sad, I'm here for you \\:)"],
			[/not?\s*sad/, "Yes, be happy! \\:)"],
			[/(?<!not?\s*)nice/, "Nice"],
			[/not?\s*nice/, "Not nice \\:("],
			[/shut|stfu/, "<:unoreverse:835873190638649426>"],
			[/<@!?738252807525892139>/, "why ping me"],
			[/phobos/, "who called me"],
		]);
		const match = Array.from(words.keys())
			.find(regex => regex.test(text));
		if (match)
			message.reply(words.get(match));
	}

];

module.exports = async message =>
	catchers.forEach(func => func(message, message.content.toLowerCase()));
