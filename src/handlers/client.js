
const { Client, Collection, Intents } = require("discord.js");

const MyClient = class extends Client {
	constructor(config) {
		super({
			disableEveryone: true,
			disabledEvents: ["TYPING_START"],
		});

		this.commands = new Collection();
		this.cooldowns = new Collection();
		this.aliases = new Collection();
		this.config = config;
	}
};

module.exports = new MyClient({ ws: { intents: new Intents(Intents.ALL) } });
