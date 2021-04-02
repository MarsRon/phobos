const { REACTION_ROLE_CHANNEL: rrChannel, REACTION_ROLE_ROLE: rrRole } = process.env;

module.exports = async function(reaction, user, deleted) {
	const { message: { guild, channel }, emoji } = reaction;
	
	if (channel.id !== rrChannel) return;

	const { roles } = await guild.members.fetch(user.id);

	let role;
	switch (emoji.name) {
	case "🔵":
		role = await guild.roles.fetch(rrRole);
		break;
	default:
		break;
	}
	if (!role) return;

	try {
		if (deleted)
			roles.remove(role);
		else
			roles.add(role);
	} catch (e) {
		console.log(e.message);
	}
};