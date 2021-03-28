const profileModel = require("../models/profileSchema");

module.exports = async function(message) {
	const { author, guild } = message;

	let profileData;
	try {
		profileData = await profileModel.findOne({ userID: author.id });
		if (!profileData) {
			let profile = await profileModel.create({
				userID: author.id,
				coins: 100,
				bank: 0
			});
			profile.save();
		}
	} catch (e) {
		console.log(e.message);
	}

	return profileData;
}