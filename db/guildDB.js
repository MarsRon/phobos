const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
	guildID: { type: String, required: true, unique: true },
	prefix: { type: String, default: "."},
	welcomeChannel: { type: String },
});

const guildModel = new model("Guilds", guildSchema);

const DEFAULT = { prefix: process.env.PREFIX, welcomeChannel: "" };

const cache = new Map();

module.exports = {
	async get({ id: guildID }) {
		const defaultData = { guildID, ...DEFAULT };

		let guildData = cache.get(guildID);
		if (!guildData) {
			guildData = await guildModel.findOne({ guildID });
			if (!guildData) {
				guildData = defaultData;
				guildModel
					.create(guildData)
					.then(profile => profile.save());
			}
			cache.set(guildID, guildData);
		}
		return guildData;
	},
	async set({ id: guildID }, mongoDBData) {
		cache.delete(guildID);
		return await guildModel.findOneAndUpdate({ guildID }, mongoDBData);
	}
};