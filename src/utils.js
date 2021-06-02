// This is just one big file with a bunch of functions/utils
// Probably need their own files in a folder but right now
// I don't have much functions/utils anyways

module.exports = {

	timeToDHMS(t) {
		t /= 1000;
		// FYI: ~~ is just Math.trunc but only works with positive numbers
		return `${~~(t/86400)}d ${~~(t/3600)%24}h ${~~(t/60)%60}m ${~~(t)%60}s`;
	},

	timeToStr(sec) {
		sec /= 1000;
		let str = "";
		if (sec >= 60) {
			if (sec >= 3600) {
				const hour = ~~(sec / 3600);
				str += `${hour} hour${hour !== 1 ? "s" : ""} `;
				sec %= 3600;
			}
			const minute = ~~(sec / 60);
			str += `${minute} minute${minute !== 1 ? "s" : ""} `;
			sec %= 60;
		}
		str += `${sec.toFixed(0)} second${sec !== 1 ? "s" : ""}`;
		return str;
	},

};
