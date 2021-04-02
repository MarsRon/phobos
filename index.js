// Modules
const { Client, Intents } = require("discord.js");
const { readdirSync } = require("fs");

// Constants
const client = new Client({ ws: { intents: new Intents(Intents.ALL) } });
const prefix = process.env.PREFIX;

// Features
const wordCatcher = require("./features/word-catcher");
const reactionRole = require("./features/reaction-role");
const getProfileData = require("./features/getProfileData");
require("./features/ExtendedMessage");
require("./features/mongo");
require("./features/music")(client);

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
		if (command.alias) {
			if (command.alias.some(alias => cmdName === alias))
				return command;
		}
	}
};

// On bot ready
client.once("ready", async () => {
	console.log(`${client.user.tag} is ready! ${new Date().toISOString().substr(11, 8)}`);
	client.user.setActivity(`${prefix}help | ${prefix}invite`, { type: "PLAYING" });

	const reactionRoleChannel = await client.channels.fetch("728979803172110386");
	reactionRoleChannel.messages.fetch();
});

// On new message
client.on("message", async message => {

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
			return message.reply(":x: This command is unavailable in DMs");
		// Permission check
		if (command.permissions) {
			const perms = channel.permissionsFor(author);
			if (!(perms && perms.has(command.permissions)))
				return message.reply(":x: Missing permission");
		}
		// Arguments check
		if (command.args && !args.length) {
			let reply = ":x: No arguments provided";
			if (command.usage)
				reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
			return message.reply(reply);
		}
		// Execute command
		try {
			command.execute(message, args);
		} catch(error) {
			console.log(error.message);
			message.reply(":x: An error occured");
		}
	}

});

// Reaction Role
client.on("messageReactionAdd", (reaction, user) =>
	reactionRole(reaction, user, false)
);

client.on("messageReactionRemove", (reaction, user) =>
	reactionRole(reaction, user, true)
);

// New user joined
client.on("guildMemberAdd", async member => {
	getProfileData(member.id);
});

// Website & Uptime Robot
const server = require("express")();
server.all("/", (req, res) => res.redirect(307, "https://marsron.github.io"));
server.listen(3000);

// Login bot
client.login(process.env.TOKEN);