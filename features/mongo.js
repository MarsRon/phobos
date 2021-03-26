const mongoose = require("mongoose");

mongoose
	.connect(process.env.MONGODB_SRV, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log("Connected to DB"))
	.catch(e => console.log(e.message));