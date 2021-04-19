const User = require("../../db/user");
const Guild = require("../../db/guild");

const fishes = [
	"Yellow Fish :tropical_fish:",
	"Fat Fish :blowfish:",
	"Blue Fish :fish:",
	"Coconut :coconut:",
	"Dolphin :dolphin:",
	"Lobster :lobster:",
	"Shark :shark:",
	"Crab :crab:",
	"Squid :squid:",
	"Whale :whale2:",
	"Shrimp :shrimp:",
	"Octopus :octopus:",
	"Duck :duck:",
	"Diamond :gem:"
];

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;

module.exports = {
	name: "fish",
	description: "Use a fishing rod to get fishes and treasures.",
	//cooldown: 15,
	async execute(message) {
		const { author, guild } = message;
		const udb = await User(author.id);
		const gdb = await Guild(guild.id);
		const { inventory, fishingrodUsage } = udb.get();
		const { prefix } = gdb.get();
		
		if (inventory.fishingrod === 0)
			return message.reply(`:x: You need to buy a fishing rod from the store. Use \`${prefix}buy fishingrod\` to buy one`);
		
		if (fishingrodUsage > rand(5, 10)) {
			inventory.fishingrod--;
			udb.set("inventory", inventory);
			udb.set("fishingrodUsage", 0);
			return message.reply(`:x: Your fishing rod has broken. Use \`${prefix}buy fishingrod\` to buy a new one`);
		}
		udb.inc("fishingrodUsage", 1);

		const fish = fishes[rand(0, fishes.length - 1)];
		message.reply(`Congratulations, you've won a ${fish}!`);
	}
};