module.exports = {
	name: "ping",
	description: "Returns bot latency and passed arguments",
	execute(message, args) {
		const { channel, createdTimestamp } = message;
		channel.send(`:ping_pong: Pong!\nBot Latency: **${Date.now() - createdTimestamp}ms**\nArguments passed: ${args.length ? `\`${args.join("`, `")}\`` : "**None**"}`);
	}
}