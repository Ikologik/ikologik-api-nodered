module.exports = function (RED) {

	function IkologikApiBatchFieldTypeNode(config) {
		RED.nodes.createNode(this, config);

		// Get configuration
		this.name = config.name;
		this.server = RED.nodes.getNode(config.server);
		this.function = config.function;
		this.customerId = config.customerId;
		this.installationId = config.installationId;
		this.batchTypeId = config.batchTypeId;
		this.batchFieldTypeId = config.batchFieldTypeId;

		// Functionality
		var node = this;
		node.on('input', async function (msg) {
			// Get data
			var customerId = node.customerId ? node.customerId : msg.customerId;
			var installationId = node.installationId ? node.installationId : msg.installationId;
			var batchTypeId = node.batchTypeId ? node.batchTypeId : msg.batchTypeId;
			var batchFieldTypeId = node.batchFieldTypeId ? node.batchFieldTypeId : msg.batchFieldTypeId;

			// Execute
			try {
				if (node.function === 'batchFieldTypeGet') {
					msg.payload = await node.server.api.batchFieldType.getByCustomerAndInstallationAndBatchTypeAndId(customerId, installationId, batchTypeId, batchFieldTypeId);
				} else if (node.function === 'batchFieldTypeList') {
					msg.payload = await node.server.api.batchFieldType.listByCustomerAndInstallationAndBatchType(customerId, installationId, batchTypeId);
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

	RED.nodes.registerType("ikologik-batchFieldType", IkologikApiBatchFieldTypeNode);

}
