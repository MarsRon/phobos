// Modules
const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const wordCatcher = require("./features/word-catcher");

// Constants
const client = new Client();
const { PREFIX: prefix } = process.env;

// Setting up commands
const commands = new Map();
readdirSync("./commands")
	.filter(file => file.endsWith(".js"))
	.map(file => require(`./commands/${file}`))
	.forEach(command => commands.set(command.name, command));
client.commands = commands;

// Get command function
const getCmd = cmdName => {
	const cmd = commands.get(cmdName);
	if (cmd) return cmd;
	for (const command of commands.values()) {
		if (command.alias.some(alias => cmdName === alias))
			return command;
	}
}

// On bot ready
client.on("ready", () => {
	console.log(`Phobos is ready! ${Date()}`);
	client.user.setActivity(`${prefix}help`, { type: "LISTENING" });
});

// On new message
client.on("message", message => {
	
	const { author, channel, content } = message;
	
	if (author.bot) return;
	wordCatcher(message); // Catch words
	if (!content.startsWith(prefix)) return;

	// Getting command and arguments
	const args = content.slice(prefix.length).trim().split(/ +/);
	const command = getCmd(args.shift().toLowerCase());

	if (command) {
		// Guild only check
		if (command.guildOnly && channel.type === "dm")
			return channel.send(":x: This command is unavailable in DMs");
		// Permission check
		if (command.permissions) {
			const perms = channel.permissionsFor(author);
			if (!(perms && perms.has(command.permissions)))
				return channel.send(":x: Missing permission");
		}
		// Arguments check
		if (command.args && !args.length) {
			let reply = ":x: No arguments provided";
			if (command.usage)
				reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``
			return channel.send(reply);
		}
		// Execute command
		try {
			command.execute(message, args);
		} catch(error) {
			console.log(error);
			channel.send(`:x: An error occured`);
		}
	}

});

// Website & Uptime Robot
const server = require("express")();
server.all("/", (req, res) => res.redirect(301, "https://marsron.github.io"));
server.listen(3000);

// Login bot
client.login(process.env.TOKEN);