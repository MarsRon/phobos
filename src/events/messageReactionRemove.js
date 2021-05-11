const reactionRole = require("../features/reactionRole");
module.exports = async (client, reaction, user) =>
	reactionRole(reaction, user, true);
