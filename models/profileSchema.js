const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
	userID: { type: String, required: true, unique: true },
	serverID: { type: String, required: true },
	coins: { type: Number, default: 1000 },
	bank: { type: Number }
});

const model = new mongoose.model("ProfileModels", profileSchema);

module.exports = model;