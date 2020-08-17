"use strict";
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const config = {
	compress: true,
	webpack(config, options) {

		config.plugins.push(
			new LodashModuleReplacementPlugin
		);

		config.resolve.alias.components = path.join(__dirname, "components");
		config.resolve.alias.modules = path.join(__dirname, "modules");
		config.resolve.alias.api = path.join(__dirname, "api/index.js");
		config.resolve.alias.utils = path.join(__dirname, "utils");

		return config;	
	}
};

export default config;
