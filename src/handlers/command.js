// Modules
const { Collection } = require("discord.js");
const { readdirSync } = require("fs");
const client = require("./client");

// Commands and cooldowns
const { commands, cooldowns, aliases } = client;

client.getCmd = name => {
	for (const category of commands.values()) {
		const cmd = category.get(name);
		if (cmd) return cmd;
	}
	return aliases.get(name);
};

for (const categoryName of readdirSync("./src/commands")) {
	if (categoryName === "cmd.js.example") continue;
	const category = new Collection();
	readdirSync(`./src/commands/${categoryName}`)
		.filter(file => file.endsWith(".js"))
		.forEach(file => {
			const command = require(`../commands/${categoryName}/${file}`);
			const { name, alias } = command;
			category.set(name, command);
			cooldowns.set(name, new Collection());
			if (alias)
				alias.forEach(a => aliases.set(a, command));	
		});
	commands.set(categoryName, category);
}
