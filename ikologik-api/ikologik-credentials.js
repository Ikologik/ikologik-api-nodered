const IkologikApi = require("ikologik-api-nodejs");

module.exports = function (RED) {

	function IkologikCredentialsNode(config) {
		RED.nodes.createNode(this, config);

		// Get configuration from node
		this.name = config.name;
		const url = config.url;
		const username = config.username;
		const password = config.password;

		// Prepare the API
		this.api = new IkologikApi(url, username, password);
	}

	RED.nodes.registerType("ikologik-credentials", IkologikCredentialsNode);

}
