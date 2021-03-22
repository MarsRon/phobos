const ownerId = process.env.OWNER_ID;

const zwsp = String.fromCharCode(8203);
const clean = text => typeof(text) === "string" ? text.replace(/`/g, "`" + zwsp).replace(/@/g, "@" + zwsp) : text;

module.exports = {
	name: "eval",
	description: "Evaluate JavsScript code (only available for <@611166639534112769>)",
	args: true,
	usage: "<js_code>",
	execute(message, args) {
		const { author, channel, client, guild } = message;
		if (author.id !== ownerId) return;
		if (!args[0]) return;
		try {
			let evaled = eval(args.join(" "));
			if (typeof(evaled) !== "string")
				evaled = require("util").inspect(evaled);
			channel.send(clean(evaled), {code: "xl", split: true});
		} catch (err) {
			channel.send(":x: **ERROR**```xl\n" + clean(err) + "```", { split: true });
		}
	}
}