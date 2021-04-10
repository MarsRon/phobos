// Modules
const { Client, Intents } = require("discord.js");
const { readdirSync } = require("fs");

// Constants
const client = new Client({ ws: { intents: new Intents(Intents.ALL) } });
const prefix = process.env.PREFIX;

// Features
const wordCatcher = require("./features/wordCatcher");
const reactionRole = require("./features/reactionRole");
const userDB = require("./db/userDB");
require("./features/ExtendedMessage");
require("./db/mongoose");
require("./features/music")(client);

// Command cooldowns
const cooldowns = client.cooldowns = new Map();

// Setting up commands
const commands = client.commands = new Map();
for (const categoryName of readdirSync("./commands")) {
	if (categoryName === "cmd.js.example") continue;
	const category = new Map();
	readdirSync(`./commands/${categoryName}`)
		.filter(file => file.endsWith(".js"))
		.map(file => require(`./commands/${categoryName}/${file}`))
		.forEach(command => {
			category.set(command.name, command);
			cooldowns.set(command.name, new Map());
		});
	commands.set(categoryName, category);
}

// Get command function
const getCmd = client.getCmd = cmdName => {
	for (const category of client.commands.values())
		for (const command of category.values())
			if (command.name === cmdName)
				return command;
			else if (command.alias?.includes(cmdName))
				return command;
};

// On bot ready
client.once("ready", async () => {
	console.log(`${client.user.tag} is ready! ${new Date().toISOString().substr(11, 8)}`);
	client.user.setActivity(`${prefix}help | ${prefix}invite`, { type: "PLAYING" });

	// Fetch reaction role channel
	client.channels
		.fetch(process.env.REACTION_ROLE_CHANNEL)
		.then(channel => channel.messages.fetch());
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
		// Cooldown check
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const userCooldown = timestamps.get(author.id);
		const cooldownAmount = (command.cooldown || 1) * 1000;
		if (userCooldown) {
			const expirationTime = userCooldown + cooldownAmount;
			if (now < expirationTime)
				return message.reply(`:x: Please wait ${((expirationTime - now) / 1000).toFixed(1)} more second(s) before reusing this command`);
		}
		timestamps.set(author.id, now);
		setTimeout(() => timestamps.delete(author.id), cooldownAmount);
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

	const { guild, user } = member;

	// MongoDB
	userDB.get(user);

	// Welcome Message
	const channel = guild.channels.cache.get(process.env.WELCOME_CHANNEL);
	if (channel)
		channel.send({embed: {
			title: `Welcome, ${user.tag}`,
			description: `Hey <@${user.id}>, welcome to **Mars Hangout**!\nDon't forget to read <#728979803172110386> too.`,
			color: 2793983,
			thumbnail: { url: user.displayAvatarURL({ dynamic: true, size: 256 }) }
		}});

});

// Website & Uptime Robot
const server = require("express")();
server.all("/", (req, res) => res.redirect(307, "https://marsron.github.io"));
server.listen(3000);

// Login bot
client.login(process.env.TOKEN);