const Guild = require("../../db/guild");

function shuffle(array) {
	let l = array.length, t, i;
	while (l) {
		i = Math.floor(Math.random() * l--);
		t = array[l];
		array[l] = array[i];
		array[i] = t;
	}
	return array;
}

module.exports = {
	name: "shuffle",
	description: "Shuffles the music queue.",
	guildOnly: true,
	async execute(message) {
		const { author, client, guild } = message;
		const queue = client.distube.getQueue(message);
		const gdb = await Guild(guild.id);
		if (!queue)
			return message.reply(`:x: **I am not playing music. Use** \`${gdb.get().prefix}play\`** to play some music!**`);
		const { songs } = queue;
		const currentlyPlaying = songs.shift();
		shuffle(songs);
		songs.unshift(currentlyPlaying);
		const formattedSongs = queue.songs.map(({ name, url, formattedDuration, user }, index) => `\`${index}.\` [${name}](${url}) | \`${formattedDuration}\` Requested by: <@${user.id}> (${user.tag})`);
		let maxI = 0, count = 0;
		for (const song of formattedSongs) {
			let sum = count + song.length + 1;
			if (sum > 2031)
				break;
			count = sum;
			maxI++;
		}
		message.reply({
			content: "Queue shuffled",
			embed: {
				title: `Queue for ${guild.name}`,
				description: `__Now Playing__:\n${formattedSongs.filter((_, i) => i < maxI).join("\n")}`,
				color: 4404979,
				footer: {
					text: `Volume: ${queue.volume}% | Filter: ${queue.filter || "❌"} | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Entire Queue" : "This Song" : "❌"} | Autoplay: ${queue.autoplay ? "On" : "❌"}`,
					icon_url: author.displayAvatarURL({ dynamic: true })
				}
			}
		});
	}
};
