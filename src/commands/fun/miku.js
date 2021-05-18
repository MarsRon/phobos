const axios = require("axios").default;

module.exports = {
	name: "miku",
	alias: ["hatsune-miku"],
	description: "Sends a random Hatsune Miku image!",
	cooldown: 5,
	execute(message) {
		const { author } = message;
		axios.get("https://mikuapi.predeactor.net/random").then(({ data: { url } }) =>
			message.reply({embed: {
				title: "Here comes Miku!!!11",
				color: 4404979,
				author: {
					name: author.tag,
					icon_url: author.displayAvatarURL({ dynamic: true })
				},
				image: { url }
			}})
		).catch(e => {
			console.log(`[command/miku] ${e}`);
			message.reply(":x: Something went wrong while trying to find Miku images \\:(");
		});
	}
};
