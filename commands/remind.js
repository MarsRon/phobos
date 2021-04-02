const ms = require("ms");

module.exports = {
	name: "remind",
	description: "Remind you stuff",
	args: true,
	usage: "<time> <message>",
	execute(message, args) {
		const { author } = message;

		const time = args.shift();
		if (!time.match(/[dmhs]$/) || isNaN(time.slice(0,-1)))
			return message.reply(":x: Examples: 1 minute `1m`, 3 hours `3h`, 10 seconds `10s`");

		const reminder = args.join(" ");
		if (!reminder)
			return message.reply(":x: Please tell me what you want to be reminded of");

		message.reply(`Your reminder will go off in ${time}`);

		setTimeout(
			() => author.send({embed: {
				title: "**REMINDER**",
				description: `**It has been ${time} here is your reminder:**\n${reminder}`,
				color: 2793983
			}}).catch(e => console.log(`Error sending DM to ${author.tag}: ${e.message}`)),
			ms(time)
		);
	}
};