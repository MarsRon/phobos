module.exports = {
	name: "changelog",
	alias: ["changelogs"],
	description: "Displays the changes made to Phobos.",
	execute(message) {
		message.reply({embed: {
			description: `**June 4**
Fixed [\`imDad\`](https://github.com/MarsRon/phobos/blob/master/src/features/wordCatcher.js#L6) not getting correct string
Changed \`rock-paper-scissors\` command to include emojis in the results
Disabled pings when replying to users

**June 2**
Added timeToStr utility function
Added \`rock-paper-scissors\` command - Play rock paper scissors with the bot.
Enabled partials for CHANNEL, MESSAGE and REACTION
Changed [\`music.js\`](https://github.com/MarsRon/phobos/blob/master/src/handlers/music.js) to improve readability
Minor bugfixes

**May 30**
Added [\`CHANGELOG.md\`](https://github.com/MarsRon/phobos/blob/master/CHANGELOG.md)
Added a blacklist for [\`wordCatcher.js\`](https://github.com/MarsRon/phobos/blob/master/src/features/wordCatcher.js)
Removed \`remind\` command because come on who uses it
Of course some bug fixes

**May 29**
New commands:
\u200b • \`covid\` - COVID-19 Statistics for Malaysia.
\u200b • \`changelog\` - Displays the changes made to Phobos.
\u200b • \`github\` - Phobos' open-source GitHub repo.
Of course tons of bug fixes`,
			color: 4404979,
			author: {
				name: "Phobos Changelog",
				url: "https://phobos.marsron.repl.co",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
			}
		}});
	}
};
