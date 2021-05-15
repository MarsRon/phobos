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
	"Diamond :gem:",
	"Cri fish <:cri:745563112106754129>",
];

const rand = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

module.exports = {
	name: "fish",
	description: "Use a fishing rod to get fishes and treasures.",
	//cooldown: 15,
	async execute(message) {
		const { author, guild } = message;
		const udb = await User(author.id);
		const { inventory, fishingrodUsage } = udb.get();
		const { prefix } = (await Guild(guild.id)).get();

		if (inventory.fishingrod === undefined || inventory.fishingrod === 0)
			return message.reply(`:x: You need to buy a fishing rod from the store. Use \`${prefix}buy fishingrod\` to buy one`);

		udb.inc("fishingrodUsage", 1);

		const fish = fishes[rand(fishes.length - 1)];
		message.reply(`Congratulations, you've fished a ${fish}!`);

		if (fishingrodUsage >= rand(5, 1)) {
			inventory.fishingrod--;
			udb.set("inventory", inventory);
			udb.set("fishingrodUsage", 0);
			if (inventory.fishingrod === 0)
				message.reply(`You don't have any fishing rods left. Use \`${prefix}buy fishingrod\` to buy a new one`);
			else
				message.reply("Your fishing rod broke");
		}
	}
};
