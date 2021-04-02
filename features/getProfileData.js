const profileModel = require("../models/profileSchema");

module.exports = async function(userID) {
	try {
		let profileData = await profileModel.findOne({ userID });
		if (!profileData) {
			profileData = {
				userID,
				coins: 100,
				bank: 0
			};
			profileModel.create(profileData)
				.then(p => p.save());
		}
		return profileData;
	} catch (e) {
		console.log(`Error in getProfileData: ${e.message}`);
	}
};