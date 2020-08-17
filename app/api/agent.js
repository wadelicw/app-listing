"use strict";
const axios = require("axios");

const agent = axios.create({
	baseURL: process.env.NODE_ENV === "production" ?
		"http://lihkg.com/api" :
		"http://localhost:3100/api"
});

module.exports = agent;

