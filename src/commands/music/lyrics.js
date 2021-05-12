const axios = require("axios").default;

module.exports = {
	name: "lyrics",
	description: "Finds the lyrics of the current song or a provided song name.",
	usage: "<link|query>",
	cooldown: 5,
	execute(message, args) {
		let query = args.join(" ");
		const { client, guild, member, author: user } = message;

		if (query === "") {
			if (guild) {
				const queue = client.distube.getQueue(message);
				if (queue)
					query = queue.songs[0].title;
			} else
				return message.reply(":x: You need to provide a song name to be searched");
		}
		message.reply(`:mag_right: **Searching lyrics for** \`${query}\``);

		axios.get("https://some-random-api.ml/lyrics?title=" + encodeURIComponent(query))
			.then(({ data: { author, links, lyrics, title, thumbnail } }) => {
				const splitLyrics = lyrics.split("\n");
				let maxI = 0, count = 0, overflowed = false;
				for (const line of splitLyrics) {
					let sum = count + line.length + 1;
					if (sum > 2044) {
						overflowed = true;
						break;
					}
					count = sum;
					maxI++;
				}
				lyrics = splitLyrics.filter((_, i) => i < maxI).join("\n");
				if (overflowed) lyrics += "\n...";
				message.channel.send(typeof data === "string" ?
					":x: Lyrics not found" :
					{embed: {
						title: `${author} - ${title}`,
						description: lyrics,
						thumbnail: { url: Object.values(thumbnail)[0] },
						color: 4404979,
						url: Object.values(links)[0],
						footer: {
							text: `Requested by ${member?.displayName || user.username}`,
							icon_url: user.displayAvatarURL({ dynamic: true, size: 32 })
						}
					}}
				);
			})
			.catch(err => {
				console.log(err);
				message.reply(":x: An error occured: " + err.response?.data.error);
			});
	}
};
