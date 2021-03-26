const owofy = require("owofy");

module.exports = {
	name: "owofy",
	description: "Owofy your message",
	args: true,
	usage: "<text>",
	execute(message, args) {
		message.reply(owofy(args.join(" ")))
			.then(msg => msg.react("745664423456145424"));
	}
}