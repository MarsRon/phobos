const profileModel = require("../models/profileSchema");

module.exports = async function(user) {
	const userID = user.id;
	const defaultValue = { userID, coins: 100, bank: 0 };
	if (user.bot)
		return defaultValue;
	try {
		let profileData = await profileModel.findOne({ userID });
		if (!profileData) {
			profileData = { ...defaultValue };
			profileModel.create(profileData)
				.then(p => p.save());
		}
		return profileData;
	} catch (e) {
		console.log(`Error in getProfileData: ${e.message}`);
	}
};