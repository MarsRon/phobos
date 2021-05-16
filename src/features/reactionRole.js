const { REACTION_ROLE_CHANNEL: rrChannel, REACTION_ROLE_ROLE: rrRole } = process.env;

function getRole(roles, emoji) {
	switch (emoji) {
		case "🔵":
			return roles.fetch(rrRole);
	}
}

module.exports = async function (reaction, user, deleted) {
	const { message: { guild, channel }, emoji } = reaction;

	if (channel.id !== rrChannel) return;

	const { roles } = await guild.members.fetch(user.id);

	const role = await getRole(guild.roles, emoji.name);
	if (!role) return;

	try {
		if (deleted)
			roles.remove(role);
		else
			roles.add(role);
	} catch (e) {
		console.log(e);
	}
};
