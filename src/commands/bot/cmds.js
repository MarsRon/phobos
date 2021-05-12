const { MessageEmbed } = require("discord.js");
const Guild = require("../../db/guild");

const pascalcase = string => string.split(" ")
	.map(s => s[0].toUpperCase() + s.slice(1)).join(" ");

module.exports = {
	name: "cmds",
	alias: ["commands"],
	description: "Shows information of a command/category.",
	usage: "<category|command>",
	async execute(message, args) {
		const { client, guild } = message;
		const query = args[0];

		const gdb = await Guild(guild?.id);
		const { prefix } = gdb.get();

		if (query) {
			const command = client.getCmd(query);
			if (command)
				return message.reply(new MessageEmbed()
					.setAuthor("Phobos", "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32", "https://phobos.marsron.repl.co")
					.setTitle(prefix + command.name)
					.setDescription(command.description)
					.setColor("#2AA1FF")
					.addField("Usage", `\`${prefix}${command.name}${command.usage ? ` ${command.usage}` : ""}\``, true)
					.addField("Aliases", command.alias ? command.alias.join(", ") : "None", true)
					.addField("Cooldown", command.cooldown ? `${command.cooldown} seconds` : "1 seconds", true)
				);
			else {
				const category = client.commands.get(query);
				if (category)
					return message.reply(new MessageEmbed()
						.setAuthor(`${pascalcase(query)} Category`, "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32", "https://phobos.marsron.repl.co")
						.setColor("#2AA1FF")
						.addFields([...category.values()]
							.map(({ name, description: value }) =>
								({ name: prefix + name, value, inline: true })
							)
						)
					);
			}
		}

		message.reply(new MessageEmbed()
			.setAuthor("Phobos Commands", "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32", "https://phobos.marsron.repl.co")
			.setColor("#2AA1FF")
			.addFields([...client.commands.keys()]
				.map(category =>
					({ name: pascalcase(category), value: `\`${prefix}cmds ${category}\``, inline: true })
				)
			)
			.setThumbnail("https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=256")
		);
	}
};
