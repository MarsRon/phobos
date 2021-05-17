const { model } = require("../../db/user");

module.exports = {
	name: "rich",
	description: "See who the richest users of Phobos are!",
	cooldown: 15,
	execute(message) {
		const { client: { users } } = message;
		Promise.all([
			message.reply(":mag_right: Fetching the top 10 richest users..."),
			model.find({}, null, { sort: { coins: -1 }, limit: 10 }).exec()
		]).then(async ([msg, res]) => {
			const data = [];
			const emoji = [":first_place:", ":second_place:", ":third_place:"];
			for (let i = 0; i < res.length; i++) {
				const { bank, coins, userID } = res[i];
				const user = users.cache.get(userID) ?? await users.fetch(userID);
				data.push(`${emoji[i] ?? "🔹"} **${(coins + bank).toLocaleString()}$** - ${user.tag}`);
			}
			msg.edit({
				content: null,
				embed: {
					description: data.join("\n"),
					color: 4404979,
					author: {
						name: "Top 10 richest users of Phobos",
						url: "https://phobos.marsron.repl.co",
						icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
					},
					footer: { text: "NOTE: This is COINs + BANKs, not net worth" }
				}
			});
		}).catch(e => {
			console.log(e);
			message.reply(":x: Something went wrong");
		});
	}
};
