const items = {
	"VIP Ranks": {
		vipbronze: {
			name: "Bronze VIP",
			price: 2500
		}
	},
	"Lifestyle Items": {
		nikes: {
			name: "Fresh Nikes",
			price: 600
		},
		car: {
			name: "Car",
			price: 1000
		},
		mansion: {
			name: "Mansion",
			price: 1500
		}
	},
	"Useful Items": {
		fishingrod: {
			name: "Fishing Rod",
			price: 50
		}
	}
};

module.exports = {
	getItem(name) {
		for (const category of Object.values(items))
			if (category[name] !== undefined)
				return category[name];
	},
	getStoreList() {
		const array = [];
		for (const [category, itemList] of Object.entries(items))
			array.push({
				name: category,
				value: Object.entries(itemList)
					.map(([key, item]) => `${item.name}: ${item.price}$ \`${key}\``)
					.join("\n")
			});
		return array;
	},
	items
};
