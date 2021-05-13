const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("site"));
app.use("/assets", express.static(path.join(__dirname, "../../assets")));

app.listen(port, () => console.log(`Website running on port ${port}`));
