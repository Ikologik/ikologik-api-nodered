module.exports = function (RED) {

	function IkologikApiBatchTraceNode(config) {
		RED.nodes.createNode(this, config);

		// Get configuration
		this.name = config.name;
		this.server = RED.nodes.getNode(config.server);
		this.function = config.function;
		this.customerId = config.customerId;
		this.installationId = config.installationId;
		this.batchId = config.batchId;
		this.batchTraceId = config.batchTraceId;

		// Functionality
		var node = this;
		node.on('input', async function (msg) {
			// Get data
			var customerId = node.customerId ? node.customerId : msg.customerId;
			var installationId = node.installationId ? node.installationId : msg.installationId;
			var batchId = node.batchId ? node.batchId : msg.batchId;
			var batchTraceId = node.batchTraceId ? node.batchTraceId : msg.batchTraceId;

			// Execute
			try {
				if (node.function === 'batchTraceGetById') {
					msg.payload = await node.server.api.batchTrace.getByCustomerAndInstallationAndId(customerId, installationId, batchId, batchTraceId);
				} else if (node.function === 'batchTraceList') {
					msg.payload = await node.server.api.batchTrace.listByCustomerAndInstallationAndBatch(customerId, installationId, batchId);
				} else if (node.function === 'batchTraceCreate') {
					msg.payload = await node.server.api.batchTrace.createByCustomerAndInstallationAndBatch(customerId, installationId, batchId, msg.batchTrace);
				} else if (node.function === 'batchTraceUpdate') {
					msg.payload = await node.server.api.batchTrace.updateByCustomerAndInstallationAndBatchAndId(customerId, installationId, batchId, batchTraceId, msg.batchTrace);
				} else if (node.function === 'batchTraceDelete') {
					msg.payload = await node.server.api.batchTrace.deleteByCustomerAndInstallationAndBatchAndId(customerId, installationId, batchId, batchTraceId);
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

	RED.nodes.registerType("ikologik-batchTrace", IkologikApiBatchTraceNode);

}
