module.exports = function (RED) {

	function IkologikApiBatchTraceNode(config) {
		RED.nodes.createNode(this, config);

		// Get configuration from node
		this.customerId = config.batchTraceCustomerId;
		this.installationId = config.batchTraceInstallationId;
		this.batchId = config.batchTraceBatchId;
		this.batchTraceId = config.batchTraceId;
		this.function = config.batchTraceFunction;
		this.credentials = RED.nodes.getNode(config.batchTraceCredentials);
		var node = this;

		// Functionality of node
		node.on('input', async function (msg) {
			// If input from node choose input, otherwise get info from message
			var customerId = node.customerId ? node.customerId : msg.customerId;
			var installationId = node.installationId ? node.installationId : msg.installationId;
			var batchId = node.batchId ? node.batchId : msg.batchId;
			var batchTraceId = node.batchTraceId ? node.batchTraceId : msg.batchTraceId;

			// Use Ikologik-api for requests
			const api = await node.credentials.api;
			if (node.function === 'batchTraceGetById') {
				msg.payload = await api.batchTrace.getById(customerId, installationId, batchId, batchTraceId);
			} else if (node.function === 'batchTraceList') {
				msg.payload = await api.batchTrace.list(customerId, installationId, batchId);
			} else if (node.function === 'batchTraceCreate') {
				msg.payload = await api.batchTrace.create(customerId, installationId, batchId, msg.batchTrace);
			} else if (node.function === 'batchTraceUpdate') {
				msg.payload = await api.batchTrace.update(customerId, installationId, batchId, batchTraceId, msg.batchTrace);
			}
			node.send(msg);
		});
	}

	RED.nodes.registerType("ikologik-batchTrace", IkologikApiBatchTraceNode);

}
