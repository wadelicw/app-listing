"use strict";
const express = require("express");
const axios = require("axios");
const app = express();

app.get("/api/config", async function (req, res) {
	const response = await axios.get("https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/10/explicit.json");
	return res.send(response.data);
});

app.listen(3100, function (error) {
	console.log("Server is listen at port 3100");
});
