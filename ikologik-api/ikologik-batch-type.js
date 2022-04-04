module.exports = function (RED) {

	function IkologikBatchTypeNode(config) {
		RED.nodes.createNode(this, config);

		// Get configuration from node
		this.customerId = config.batchTypeCustomerId;
		this.installationId = config.batchTypeInstallationId;
		this.batchTypeId = config.batchTypeId;
		this.batchTypeName = config.batchTypeName;
		this.function = config.batchTypeFunction;
		this.credentials = RED.nodes.getNode(config.batchTypeCredentials);
		var node = this;

		// Functionality of node
		node.on('input', async function (msg) {
			// If input from node choose input, otherwise get info from message
			var customerId = node.customerId ? node.customerId : msg.customerId;
			var installationId = node.installationId ? node.installationId : msg.installationId;
			var batchTypeId = node.batchTypeId ? node.batchTypeId : msg.batchTypeId;
			var batchTypeName = node.batchTypeName ? node.batchTypeName : msg.batchTypeName;

			// Use Ikologik-api for requests
			// TODO: batchTypeName is hard-coded ! Pay attention when changing to a new batchTypeName
			const api = await node.credentials.api;
			if (node.function === 'batchTypeGetByName') {
				msg.payload = await api.batchType.getByName(customerId, installationId, batchTypeName);
			} else if (node.function === 'batchTypeList') {
				msg.payload = await api.batchType.list(customerId, installationId);
			}
			node.send(msg);
		});
	}

	RED.nodes.registerType("ikologik-batchType", IkologikBatchTypeNode);

}
