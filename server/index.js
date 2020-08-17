"use strict";
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/api/apps/free", async function (req, res) {
	const response = await axios.get("https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/10/explicit.json");
	const ids = response.data.feed.results.map(item => item.id);
	// https://itunes.apple.com/hk/lookup?id=1480196084,1518267642,1501484653
	const starResponse = await axios.get("https://itunes.apple.com/hk/lookup", { params: { id: ids.join(",") } });

	response.data.feed.results.map(result => {
		const _item = starResponse.data.results.find(item => item.trackId == result.id);
		result.rating = {
			star: _item.averageUserRatingForCurrentVersion,
			count: _item.userRatingCount
		};
		return result;
	});

	return res.send(response.data);
});

app.get("/api/apps/gross", async function (req, res) {
	const response = await axios.get("https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json");

	const ids = response.data.feed.results.map(item => item.id);
	// https://itunes.apple.com/hk/lookup?id=1480196084,1518267642,1501484653
	const starResponse = await axios.get("https://itunes.apple.com/hk/lookup", { params: { id: ids.join(",") } });

	response.data.feed.results.map(result => {
		const _item = starResponse.data.results.find(item => item.trackId == result.id);
		result.rating = {
			star: _item.averageUserRatingForCurrentVersion,
			count: _item.userRatingCount
		};
		return result;
	});
	
	return res.send(response.data);
});

app.listen(3100, function (error) {
	console.log("Server is listen at port 3100");
});
