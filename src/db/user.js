const mongoose = require("mongoose");

const dbCache = new Map(), dbSaveQueue = new Map();

const userObject = {
	userID: "",
	coins: 100,
	bank: 0,
	multiplier: 1,
	inventory: {},
	lastDaily: Date.now() - 86400000,
	fishingrodUsage: 0
};
const userSchema = {
	userID: { type: String, required: true, unique: true },
	coins: { type: Number },
	bank: { type: Number },
	multiplier: { type: Number },
	inventory: { type: Object },
	lastDaily: { type: Number },
	fishingrodUsage: { type: Number }
};

const deepClone = obj => JSON.parse(JSON.stringify(obj));

const User = new mongoose.model("Users", new mongoose.Schema(userSchema));

const get = userID => new Promise((resolve, reject) =>
	User.findOne({ userID }, (err, user) => {
		if (err) return reject(err);
		if (!user) {
			user = new User(deepClone(userObject));
			user.userID = userID;
		}
		return resolve(user);
	})
);

const load = async userID => {
	let user = await get(userID),
		userCache = {},
		defaultObject = deepClone(userObject);
	for (const key in defaultObject)
		userCache[key] = user[key] ?? defaultObject[key];
	return dbCache.set(userID, userCache);
};

const save = async (userID, changes) => {
	if (!dbSaveQueue.has(userID)) {
		dbSaveQueue.set(userID, changes);

		let user = await get(userID),
			userCache = dbCache.get(userID),
			userSaveQueue = deepClone(dbSaveQueue.get(userID));

		for (const key of userSaveQueue)
			user[key] = userCache[key];

		return user.save().then(() => {
			const newSaveQueue = dbSaveQueue.get(userID);
			dbSaveQueue.delete(userID);
			if (newSaveQueue.length > userSaveQueue.length)
				save(userID, newSaveQueue.filter(key => !userSaveQueue.includes(key)));
		}).catch(console.log);
	} else
		dbSaveQueue.get(userID).push(...changes);
};

module.exports = async userID => {
	if (!dbCache.has(userID))
		await load(userID);
	return {
		get: () => Object.assign({}, dbCache.get(userID)),
		set(key, value) {
			dbCache.get(userID)[key] = value;
			save(userID, [key]);
		},
		inc(key, value) {
			dbCache.get(userID)[key] += value;
			save(userID, [key]);
		}
	};
};

module.exports.refresh = function () {
	Array.from(dbCache.keys()).forEach(load);
};

module.exports.model = User;
