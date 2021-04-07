const ownerId = process.env.OWNER_ID;

const zwsp = String.fromCharCode(8203);
const clean = text => typeof(text) === "string" ? text.replace(/`/g, "`" + zwsp).replace(/@/g, "@" + zwsp) : text;
const { inspect } = require("util");

module.exports = {
	name: "eval",
	description: "Run JavaScript code.",
	args: true,
	usage: "<js_code>",
	async execute(message, args) {
		//eslint-disable-next-line no-unused-vars
		const { channel, client, guild, member, author: user } = message;
		
		if (user.id !== ownerId) return;
		if (!args.length) return;

		try {
			let evaled = eval(args.join(" "));
			if (typeof(evaled) !== "string")
				evaled = inspect(evaled);
			message.reply(clean(evaled), { code: "js", split: true });
		} catch (err) {
			message.reply(":x: **ERROR**```js\n" + clean(err.message) + "```", { split: true });
		}
	}
};