require("mongoose")
	.connect(process.env.MONGODB_SRV, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => console.log("[mongoose] Connected to database"))
	.catch(e => console.log(`[mongoose] Error while connecting to database: ${e.message}`));
