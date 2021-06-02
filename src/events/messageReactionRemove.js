const reactionRole = require("../features/reactionRole");
module.exports = async (client, reaction, user) => {
	// Reaction Partial
	if (reaction.partial)
		try {
			await reaction.fetch();
		} catch(e) {
			return console.log("[event/messageReactionRemove] Reaction Partial error", e);
		}
	
	// Message Partial
	const { message } = reaction;
	if (message.partial)
		try {
			await message.fetch();
		} catch(e) {
			return console.log("[event/messageReactionRemove] Message Partial error", e);
		}

	// DM Channel Partial
	const { channel } = message;
	if (channel.partial)
		try {
			await channel.fetch();
		} catch(e) {
			return console.log("[event/messageReactionRemove] Channel Partial error", e);
		}

	reactionRole(reaction, user, false);
};
