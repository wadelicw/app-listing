"use strict";
const agent = require("./agent");

async function getFreeApps() {
	const response = await agent.get("/apps/free");
	return response.data.feed;
}

async function getGrossingApps() {
	const response = await agent.get("/apps/gross");
	return response.data.feed;
}

module.exports = {
	getFreeApps, getGrossingApps
};
