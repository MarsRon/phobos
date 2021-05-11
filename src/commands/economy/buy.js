const User = require("../../db/user");
const Guild = require("../../db/guild");

const { getItem } = require("../../const/economyStore");

module.exports = {
	name: "buy",
	description: "Buy something from the store.",
	args: true,
	usage: "<item>",
	async execute(message, args) {
		const gdb = await Guild(message.guild?.id);
		const { prefix } = gdb.get();

		const item = getItem(args[0]);
		if (!item)
			return message.reply(`:x: Item not found. Use \`${prefix}store\` to see items for sale`);
		
		const udb = await User(message.author.id);
		const { coins, inventory } = udb.get();

		if (coins < item.price)
			return message.reply(`:x: You need ${item.price}$ to purchase ${item.name}, still lacking ${item.price - coins}$`);

		udb.inc("coins", -item.price);
		if (inventory[args[0]] !== undefined)
			inventory[args[0]]++;
		else
			inventory[args[0]] = 1;
		udb.set("inventory", inventory);

		message.reply(`Successfully purchased ${item.name} for ${item.price}$! Use \`${prefix}inv\` to view your purchased items`);
	}
};
