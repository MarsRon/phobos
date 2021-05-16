const Guild = require("../../db/guild");

const arrayChunks = (array, chunk) => array.reduce((all, item, i) => {
	const ch = Math.floor(i/chunk);
	if (!all[ch]) all[ch] = [];
	all[ch].push(item);
	return all;
}, []);

module.exports = {
	name: "queue",
	alias: ["q"],
	description: "Shows the all the songs of the queue.",
	guildOnly: true,
	async execute(message) {
		const { author, client: { distube }, guild } = message;
		const queue = distube.getQueue(message);
		if (!queue)
			return message.reply(`:x: **I am not playing music. Use** \`${(await Guild(guild.id)).get().prefix}play\`** to play some music!**`);

		const songs = arrayChunks(queue.songs
			.map(({ name, url, formattedDuration, user }, index) =>
				`\`${index}.\` [${name}](${url}) | \`${formattedDuration}\` Requested by: <@${user.id}> (${user.tag})`
			), 5);

		const pages = songs.map((chunk, index) => ({embed: {
			title: `Queue for ${guild.name}`,
			description: `**Now Playing:**\n${chunk.join("\n")}${songs.length > 1 ? `\nPage ${index+1} / ${songs.length}` : ""}`,
			color: 4404979,
			footer: {
				text: `Volume: ${queue.volume}% | Filter: ${queue.filter || "❌"} | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "Entire Queue" : "This Song" : "❌"} | Autoplay: ${queue.autoplay ? "On" : "❌"}`,
				icon_url: author.displayAvatarURL({ dynamic: true })
			}
		}}));

		const msg = await message.reply(pages[0]);
		if (songs.length > 1)
			embedPager(msg, pages);
	}
};

function embedPager(message, pages) {
	const emojiList = ["⬅", "➡"];
	const pageResolver = (pages, pageIndex, reaction) => {
		switch (reaction.emoji.name) {
			case emojiList[0]:
				return pageIndex > 0 ? pageIndex - 1 : pages.length - 1;
			case emojiList[1]:
				return pageIndex + 1 < pages.length ? pageIndex + 1 : 0;
			default:
				return pageIndex;
		}
	};
	let pageIndex = 0;
	const collector = message.createReactionCollector(
		(reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot, { time: 60000 }
	);
	collector.on("collect", async (reaction, user) => {
		try {
			await reaction.users.remove(user.id);
			const currentPage = pageIndex;
			pageIndex = pageResolver(pages, pageIndex, reaction);
			if (!message.deleted && currentPage != pageIndex)
				message.edit(pages[pageIndex]);
		} // eslint-disable-next-line no-empty
		catch {}
	});
	collector.on("end", () => {
		if (!message.deleted) message.reactions.removeAll();
	});
	(async () => {
		for (const emoji of emojiList)
			await message.react(emoji);
	})();
}
