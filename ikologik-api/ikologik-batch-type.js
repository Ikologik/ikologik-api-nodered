const IkologikApi = require("ikologik-api-nodejs");

module.exports = function (RED) {

	function IkologikBatchTypeNode(config) {
		RED.nodes.createNode(this, config);

		// Get configuration
		this.name = config.name;
		this.server = RED.nodes.getNode(config.server);
		this.function = config.function;
		this.customerId = config.customerId;
		this.installationId = config.installationId;
		this.batchTypeId = config.batchTypeId;
		this.batchTypeName = config.batchTypeName;

		// Functionality
		var node = this;
		node.on('input', async function (msg) {
			// Get data
			var customerId = node.customerId ? node.customerId : msg.customerId;
			var installationId = node.installationId ? node.installationId : msg.installationId;
			var batchTypeId = node.batchTypeId ? node.batchTypeId : msg.batchTypeId;
			var batchTypeName = node.batchTypeName ? node.batchTypeName : msg.batchTypeName;

			// Execute
			try{
				if (node.function === 'batchTypeGetByName') {
					msg.payload = await node.server.api.batchType.getByCustomerAndInstallationAndName(customerId, installationId, batchTypeName);
				} else if (node.function === 'batchTypeList') {
					msg.payload = await node.server.api.batchType.listByCustomerAndInstallation(customerId, installationId);
				} else {
					throw new Error('Unsupported function');
				}
				msg.error = null;
				node.send([msg, null]);
			} catch (e) {
				msg.error = e;
				node.send([null, msg]);
			}
		});
	}

	RED.nodes.registerType("ikologik-batchType", IkologikBatchTypeNode);

}
