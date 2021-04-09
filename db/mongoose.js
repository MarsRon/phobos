require("mongoose")
	.connect(process.env.MONGODB_SRV, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch(e => console.log(e.message));