// Configure environment variables
require("dotenv").config();

// Require handlers
require("fs").readdirSync("./src/handlers")
	.forEach(handler => require(`./handlers/${handler}`));

// Login bot
const client = require("./handlers/client");

client.login(process.env.TOKEN);
