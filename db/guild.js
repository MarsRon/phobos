const mongoose = require("mongoose");

const dbCache = new Map(), dbSaveQueue = new Map();

const guildObject = {
	guildID: "",
	prefix: process.env.PREFIX,
	welcomeChannel: "",
};
const guildSchema = {
	guildID: { type: String, required: true, unique: true },
	prefix: { type: String, default: process.env.PREFIX},
	welcomeChannel: { type: String },
};

const deepClone = obj => JSON.parse(JSON.stringify(obj));

const Guild = new mongoose.model("Guilds", new mongoose.Schema(guildSchema));

const get = guildID => new Promise((resolve, reject) =>
	Guild.findOne({ guildID }, (err, guild) => {
		if (err) return reject(err);
		if (!guild) {
			guild = new Guild(deepClone(guildObject));
			guild.guildID = guildID;
		}
		return resolve(guild);
	})
);

const load = async guildID => {
	let guild = await get(guildID),
		guildCache = {},
		defaultObject = deepClone(guildObject);
	for (const key in defaultObject)
		guildCache[key] = guild[key] ?? defaultObject[key];
	return dbCache.set(guildID, guildCache);
};

const save = async (guildID, changes) => {
	if (!dbSaveQueue.has(guildID)) {
		dbSaveQueue.set(guildID, changes);

		let guild = await get(guildID),
			guildCache = dbCache.get(guildID),
			guildSaveQueue = deepClone(dbSaveQueue.get(guildID));

		for (const key of guildSaveQueue)
			guild[key] = guildCache[key];

		return guild.save().then(() => {
			const newSaveQueue = dbSaveQueue.get(guildID);
			dbSaveQueue.delete(guildID);
			if (newSaveQueue.length > guildSaveQueue.length)
				save(guildID, newSaveQueue.filter(key => !guildSaveQueue.includes(key)));
		}).catch(console.log);
	} else
		dbSaveQueue.get(guildID).push(...changes);
};

module.exports = async guildID => {
	if (!dbCache.has(guildID))
		await load(guildID);
	return {
		get: () => Object.assign({}, dbCache.get(guildID)),
		set(key, value) {
			dbCache.get(guildID)[key] = value;
			save(guildID, [key]);
		}
	};
};