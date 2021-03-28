const ytdl = require("ytdl-core");
const yts = require("yt-search");
const queue = require("../features/musicQueue");

async function addSong(message, args) {
	const { channel, guild: { id: guildId }, author } = message;
	const query = args.join(" ");
	channel.send(`:mag_right: **Searching** \`${query}\``);
	
	let song;
	try {
		if (ytdl.validateURL(query)) {
			const {
				videoDetails: { title, video_url: url, lengthSeconds: seconds }
			} = await ytdl.getBasicInfo(query);
			song = { title, url, seconds, requester: author.tag }
		} else if (ytdl.validateURL(`https://youtube.com/watch?v=${query}`)) {
			const {
				videoDetails: { title, video_url: url, lengthSeconds: seconds }
			} = await ytdl.getBasicInfo(`https://youtube.com/watch?v=${query}`);
			song = { title, url, seconds, requester: author.tag }
		} else {
			const { videos } = await yts(query);
			if (!videos.length)
				return message.reply(":x:No songs were found!");
			const { seconds, title, url } = videos[0];
			song = { title, url, seconds, requester: author.tag }
		}
	} catch(e) {
		return channel.send(`:x: An error occurred: ${e.message}`);
	}

	const posInQueue = queue.get(guildId).songs.push(song);
	if (queue.get(guildId).songs.length > 0 && queue.get(guildId).playing)
		channel.send(`Added \`${song.title}\`to queue\nPosition in queue: ${posInQueue}`);
}

async function execute(message, args) {
	const {
		channel,
		client: { commands },
		guild: { id: guildId, voice },
		member
	} = message;

	if (!voice?.connection)
		return commands.get("join").execute(message)
			.then(() => execute(message, args));
	if (args.length)
		await addSong(message, args);
	
	if (queue.get(guildId).playing)
		return;
	queue.get(guildId).playing = true;
	
	// TODO: add actual play
	while (queue.get(guildId).songs.length > 0) {
		const song = queue.get(guildId).songs.shift()
		channel.send(`**Playing** :notes: \`${song.title}\` - Now!`);
	}
}

module.exports = {
	name: "play",
	alias: ["p"],
	description: "Plays a song with the given name or url",
	args: true,
	usage: "<link|query>",
	guildOnly: true,
	execute
}