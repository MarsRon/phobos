const { cacheAll } = require("../../db/user");

module.exports = {
	name: "rich",
	description: "See who the richest users of Phobos are!",
	cooldown: 15,
	execute(message) {
		const { client: { users } } = message;
		cacheAll().then(async res => {
			const data = res.sort((a, b) => b.coins + b.bank - a.coins - a.bank).slice(0, 10);
			const topUsers = [];
			const emoji = [":first_place:", ":second_place:", ":third_place:"];
			for (let i = 0; i < data.length; i++) {
				const { coins, bank, userID } = data[i];
				let user = users.cache.get(userID);
				if (user === undefined) {
					try {
						user = await users.fetch(userID);
					} catch {
						user = { tag: ":x: User not found." };
					}
				}
				topUsers.push(`${emoji[i] ?? "🔹"} **${(coins + bank).toLocaleString()}$** - ${user.tag}`);
			}
			message.reply({embed: {
				description: topUsers.join("\n"),
				color: 4404979,
				author: {
					name: "Top 10 Richest Users Of Phobos",
					url: "https://phobos.marsron.repl.co",
					icon_url: "https://cdn.discordapp.com/avatars/738252807525892139/3d8cd9c0887eeb2c8b6b4a6226e3710a.webp?size=32"
				},
				footer: { text: "NOTE: This doesn't include inventory items." }
			}});
		}).catch(e => {
			console.log(`[command/rich] ${e}`);
			message.reply(":x: Something went wrong");
		});
	}
};
