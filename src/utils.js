// This is just one big file with a bunch of functions/utils
// Probably need their own files in a folder but right now
// I don't have much functions/utils anyways

module.exports = {

	timeToDHMS(t) {
		t /= 1000;
		// FYI: ~~ is just Math.trunc but only works with positive numbers
		return `${~~(t/86400)}d ${~~(t/3600)%24}h ${~~(t/60)%60}m ${~~(t)%60}s`;
	},

	timeToStr(t) {
		t /= 1000;
		let str = "";
		if (t >= 60) {
			if (t >= 3600) {
				str += ~~(t / 3600) + " hour(s) ";
				t %= 3600;
			}
			str += ~~(t / 60) + " minute(s) ";
			t %= 60;
		}
		str += t.toFixed(0) + " second";
		if (t !== 1) str += "s";
		return str;
	},

};
