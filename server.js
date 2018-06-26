"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const home = require("./routes/home-routes");

app.use(bodyParser.json());

app.use(express.static(__dirname+ "/public"));
app.use("/", home);

let port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});