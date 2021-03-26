module.exports = async function(reaction, user, deleted) {

	const { message: { guild, id }, emoji } = reaction;
	
	if (id !== "824841058826584134") return;

	const { roles } = await guild.members.fetch(user.id);

	let role;
	console.log(emoji.name)
	switch (emoji.name) {
		case "🔵":
			role = await guild.roles.fetch("748697043471696062");
			break;
		default:
			break;
	}

	if (!role) return;

	if (deleted)
		roles.remove(role).catch(e => console.log(e.message));
	else
		roles.add(role).catch(e => console.log(e.message));

}