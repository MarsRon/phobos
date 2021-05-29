// Modify console.log
const { log } = console;
console.log = function () {
	const args = [...arguments];
	args.unshift(new Date().toISOString().substr(11, 8));
	log.apply(console, args);
};

// Configure environment variables
require("dotenv").config();

// Require handlers
require("fs").readdirSync("./src/handlers")
	.forEach(handler => require(`./handlers/${handler}`));

// Login bot
require("./handlers/client").login(process.env.TOKEN);
