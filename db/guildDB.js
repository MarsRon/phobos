const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
	guildID: { type: String, required: true, unique: true },
	welcomeChannel: { type: String },
	reactionRole: { type: Map },

});

module.exports = new model("Guilds", guildSchema);