// Modules
const { Client } = require("discord.js");

// Constants
const client = new Client();
const { PREFIX: prefix } = process.env;

// On bot ready
client.on("ready", () => {
	console.log(`Phobos is ready! ${Date()}`);
	client.user.setActivity(`${prefix}help`, { type: "LISTENING" });
});

client.on("message", message => {
	const { author, channel, content } = message;
	
	if (author.bot) return;
	if (!content.startsWith(prefix)) return;

	const args = content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (commandName === "ping")
		return channel.send(`:ping_pong: Pong!\nLatency: **${Date.now() - message.createdTimestamp}ms**\nArguments passed: \`${args.join("`, `")}\``);
});

const server = require("express")();
server.all("/", (req, res) => res.redirect(301, "https://marsron.github.io"));
server.listen(3000);

client.login(process.env.TOKEN);