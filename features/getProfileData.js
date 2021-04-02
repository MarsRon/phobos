const profileModel = require("../models/profileSchema");

module.exports = async function(message) {
	const { author: { id: userID } } = message;

	let profileData;
	try {
		profileData = await profileModel.findOne({ userID });
		if (!profileData) {
			let profile = await profileModel.create({
				userID,
				coins: 100,
				bank: 0
			});
			profile.save();
		}
	} catch (e) {
		console.log(e.message);
	}

	return profileData;
};