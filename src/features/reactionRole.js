const { REACTION_ROLE_CHANNEL: rrChannel, REACTION_ROLE_ROLE: rrRole } = process.env;

function getRole(roles, emoji) {
	switch (emoji) {
		case "🔵":
			return roles.fetch(rrRole);
	}
}

module.exports = async (reaction, user, added) => {
	const { message: { guild, channel }, emoji } = reaction;

	if (channel.id !== rrChannel) return;

	const { roles } = await guild.members.fetch(user.id);

	const role = await getRole(guild.roles, emoji.name);
	if (!role) return;

	try {
		if (added)
			roles.add(role);
		else
			roles.remove(role);
	} catch (e) {
		console.log(`[reaction role] ${e.message}`);
	}
};
