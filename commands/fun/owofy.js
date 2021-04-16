const owofire = require("owofire");

module.exports = {
	name: "owofy",
	description: "Owoifies your message.",
	args: true,
	usage: "<text>",
	execute(message, args) {
		message.reply(owofire(args.join(" ")))
			.then(msg => msg.react("745664423456145424")
				.catch(e => console.log(e.message))
			);
	}
};