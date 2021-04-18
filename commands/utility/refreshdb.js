const ownerId = process.env.OWNER_ID;
const User = require("../../db/user");
const Guild = require("../../db/guild");

module.exports = {
	name: "refreshdb",
	alias: ["rdb"],
	description: "Refresh the database.",
	execute(message) {
		if (message.author.id !== ownerId) return;
		User.refresh();
		Guild.refresh();
		message.reply("Done");
	}
};