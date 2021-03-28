const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
	userID: { type: String, required: true, unique: true },
	coins: { type: Number, default: 100 },
	bank: { type: Number }
});

const model = new mongoose.model("ProfileModels", profileSchema);

module.exports = model;