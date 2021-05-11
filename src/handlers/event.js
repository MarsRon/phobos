const client = require("./client");

require("fs").readdir("./src/events", (err, files) => {
	if (err) console.log(err);
	files.filter(file => file.endsWith(".js"))
		.map(file => file.slice(0, -3))
		.forEach(name =>
			client.on(name, require(`../events/${name}`).bind(null, client))
		);
});
