const ownerId = process.env.OWNER_ID;

const zwsp = String.fromCharCode(8203);
const clean = text => typeof(text) === "string" ? text.replace(/`/g, "`" + zwsp).replace(/@/g, "@" + zwsp) : text;
const { inspect } = require("util");

module.exports = {
	name: "eval",
	description: "Evaluate JavsScript code (only available for <@611166639534112769>)",
	args: true,
	usage: "<js_code>",
	async execute(message, args) {
		const { channel, client, guild, member, author: user } = message;
		
		if (user.id !== ownerId) return;
		if (!args) return;

		const CHANNEL = async id => await client.channels.fetch(id);
		const GUILD = async id => await client.guilds.fetch(id);
		const MEMBER = async id => await guild.members.fetch(id);
		const USER = async id => await client.users.fetch(id);
		
		try {
			let evaled = eval(args.join(" "));
			if (typeof(evaled) !== "string")
				evaled = inspect(evaled);
			message.reply(clean(evaled), { code: "js", split: true });
		} catch (err) {
			message.reply(":x: **ERROR**```js\n" + clean(err.message) + "```", { split: true });
		}
	}
}