const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("site"));
app.use("/assets", express.static("assets"));

app.listen(port, () => console.log(`Website running on port ${port}`));
