"use strict";
const agent = require("./agent");

async function getConfig() {
	const response = await agent.get("/config");
	return response.data;
}

module.exports = {
	getConfig
};
