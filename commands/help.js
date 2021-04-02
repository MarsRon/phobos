const { MessageEmbed } = require("discord.js");

const prefix = process.env.PREFIX;

module.exports = {
	name: "help",
	alias: ["phobos"],
	description: "Bring up the help message, or get help on certain commands",
	usage: "[command]",
	execute(message, args) {
		const { client } = message;

		if (args.length) {
			if (args[0] === "cmds") {
				return message.reply(new MessageEmbed()
					.setAuthor("Command List", "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32", "https://marsron.github.io")
					.setColor("#2AA1FF")
					.addFields(Array.from(client.commands)
						.map(([name, { description: value }]) =>
							({ name: prefix + name, value, inline: true })
						)
					)
				);
			}

			const getCmd = cmdName => {
				const cmd = client.commands.get(cmdName);
				if (cmd) return cmd;
				for (const command of client.commands.values()) {
					if (command.alias?.some(alias => cmdName === alias))
						return command;
				}
			};
			const command = getCmd(args[0]);
			if (command)
				return message.reply(new MessageEmbed()
					.setAuthor("Phobos", "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32", "https://marsron.github.io")
					.setTitle(prefix + command.name)
					.setDescription(command.description)
					.setColor("#2AA1FF")
					.addField("Usage", `\`${prefix}${command.name}${command.usage ? ` ${command.usage}` : ""}\``, true)
					.addField("Aliases", command.alias ? command.alias.join(" ") : "None", true)
				);
		}

		message.reply({embed: {
			color: 2793983,
			fields: [
				{ name: ":open_file_folder: Commands List", value: `\`${prefix}help cmds\``},
				{ name: ":white_check_mark: Help Page", value: "https://marsron.github.io" },
				{ name: ":question: Arguments usage", value: "`<required>`, `[optional]`" },
				{ name: ":page_facing_up: Still need help?", value: "[Click here](https://discord.gg/TSqw3jx) to join our Discord server" }
			],
			author: {
				name: "Phobos Commands",
				url: "https://marsron.github.io",
				icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=32"
			},
			thumbnail: { url: "https://cdn.discordapp.com/avatars/738252807525892139/70c554767b079e2774ea9a7d8b432cb7.webp?size=256" }
		}});
	}
};