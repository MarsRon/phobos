// Features
const Guild = require("../db/guild");
const wordCatcher = require("../features/wordCatcher");

const { timeToStr } = require("../utils");

module.exports = async (client, message) => {
	// Message Partial
	if (message.partial)
		try {
			await message.fetch();
		} catch {
			return;
		}

	const { author, channel, content, guild, webhookID } = message;

	// User Partial
	if (author.partial)
		try {
			await author.fetch();
		} catch {
			return;
		}

	if (author.bot || webhookID) return;

	// Get guild settings
	const { prefix } = (await Guild(guild?.id)).get();

	if (!content.startsWith(prefix))
		return wordCatcher(message);

	// Getting command and arguments
	const args = content.slice(prefix.length).trim().split(/ +/);
	const command = client.getCmd(args.shift().toLowerCase());

	if (command) {
		// Cooldown check
		const now = Date.now();
		const timestamps = client.cooldowns.get(command.name);
		const userCooldown = timestamps.get(author.id);
		const cooldownAmount = (command.cooldown || 1) * 1000;
		if (userCooldown) {
			const timeLeft = userCooldown + cooldownAmount - now;
			if (timeLeft > 0)
				return message.reply(`:x: Please wait ${timeToStr(timeLeft)} before reusing this command`);
		}
		// Guild only check
		if (command.guildOnly && channel.type === "dm")
			return message.reply(":x: This command is unavailable in DMs");
		// Permission check
		if (command.permission) {
			const perms = channel.permissionsFor(author);
			if (!(perms && perms.has(command.permission)))
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
			// Cooldown
			timestamps.set(author.id, now);
			setTimeout(() => timestamps.delete(author.id), cooldownAmount);
		} catch(error) {
			console.log(`[event/message] ${error}`);
			message.reply(`:x: An error occurred: ${error.message}`);
		}
	}
};
