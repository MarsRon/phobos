module.exports = {
	name: "botinfo",
	description: "Information about the bot",
	execute(message) {
		message.reply(`Bot was created by MarsRon, the <:cri:774494797871972403> champion.\nInvite me with \`${process.env.PREFIX}invite\`!`)
	}
}