const { Schema, model } = require("mongoose");

const userModel = new model("Users", new Schema({
	userID: { type: String, required: true, unique: true },
	coins: { type: Number, default: 100 },
	bank: { type: Number }
}));

const DEFAULT = { coins: 100, bank: 0 };

const cache = new Map();

module.exports = {
	async get(user) {
		const userID = user.id;
		const defaultData = { userID, ...DEFAULT };

		if (user.bot) return defaultData;

		let userData = cache.get(user.id);
		if (!userData) {
			userData = await userModel.findOne({ userID });
			if (!userData) {
				userData = defaultData;
				userModel
					.create(userData)
					.then(profile => profile.save());
			}
			cache.set(user.id, userData);
		}
		return userData;
	},
	async set({ bot, id: userID }, mongoDBData) {
		if (bot) return;
		const userData = await userModel.findOneAndUpdate({ userID }, mongoDBData, { upsert: true });
		cache.set(userID, userData);
		return userData;
	}
};