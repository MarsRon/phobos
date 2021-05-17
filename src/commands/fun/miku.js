const axios = require("axios").default;

module.exports = {
	name: "miku",
	alias: ["hatsune-miku"],
	description: "Sends a random Hatsune Miku image!",
	cooldown: 5,
	execute(message) {
		const { author } = message;
		Promise.all([
			message.reply(":mag_right: Searching..."),
			axios.get("https://mikuapi.predeactor.net/random")
		]).then(([msg, { data: { url } }]) => {
			msg.edit({
				content: "**Here comes Miku!!1**",
				embed: {
					url,
					color: 4404979,
					author: {
						name: author.tag,
						icon_url: author.displayAvatarURL({ dynamic: true })
					},
					image: { url }
				}
			});
		}).catch(e => {
			console.log(e);
			message.reply(":x: Something went wrong while trying to find miku images \\:(");
		});
	}
};
