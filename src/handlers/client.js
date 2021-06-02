const { Client, Collection, Intents } = require("discord.js");

const client = new Client({
	ws: { intents: new Intents(Intents.ALL) },
	partials: ["CHANNEL", "MESSAGE", "REACTION"],
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();

module.exports = client;
