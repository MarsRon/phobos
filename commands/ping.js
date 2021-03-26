module.exports = {
	name: "ping",
	description: "Returns bot latency and passed arguments",
	execute(message, args) {
		message.reply(`:ping_pong: Pong!\nBot Latency: **${Date.now() - message.createdTimestamp}ms**\nArguments passed: ${args.length ? `\`${args.join("`, `")}\`` : "**None**"}`);
	}
}