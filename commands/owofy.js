function owo(text) {
	const faces = ["(o´∀`o)", "(#｀ε´)", "(๑•̀ㅁ•́๑)✧", "(*≧m≦*)", "(・`ω´・)", "UwU", "OwO", ">w<", "｡ﾟ( ﾟ^∀^ﾟ)ﾟ｡", "ヾ(｀ε´)ﾉ", "(´• ω •`)", "o(>ω<)o", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "(⁀ᗢ⁀)", "(￣ε￣＠)", "( 〃▽〃)", "(o^ ^o)", "ヾ(*'▽'*)", "(*^ω^)", "(◕‿◕✿)", "(◕ᴥ◕)", "ʕ•ᴥ•ʔ", "ʕ￫ᴥ￩ʔ", "(*^.^*)", "owo", "(｡♥‿♥｡)", "uwu", "(*￣з￣)", ">w<", "^w^", "(つ✧ω✧)つ", "(/ =ω=)/"];
	const { floor, random } = Math;
	return `${text
		.replace(/l|r/g, "w")
		.replace(/L|R/g, "W")
		.replace(/n([aeiou])/g, "ny$1")
		.replace(/N([aeiou])/g, "Ny$1")
		.replace(/N([AEIOU])/g, "NY$1")
		.replace(/ove/g, "uv")
		.replace(/OVE/g, "UV")
		.replace(/z(?:\s)/, "z~")
		.replace(/!+/g, `! ${faces[floor(random() * faces.length)]}`)

		.replace(/\?/g, " uwu?")
		.replace(/the/g, "teh")
		.replace(/this/g, "dis")
		.replace(/with/g, "wif")
		.replace(/you/g, "u")
		.replace(/youw/g, "ur")
		.replace(/,|;/g, "~")
		.replace(/:\)/g, ":3")
		.replace(/:O/g, "OwO")
		.replace(/:o/g, "owo")
		.replace(/:D/g, "UwU")
		.replace(/XD/g, "X3")
		.replace(/xD/g, "x3")
	} ${faces[floor(random() * faces.length)]}`;
}

module.exports = {
	name: "owofy",
	description: "Owofy your message",
	args: true,
	usage: "<text>",
	execute(message, args) {
		message.reply(owo(args.join(" ")))
			.then(msg => msg.react("745664423456145424").catch(() => {}));
	}
}