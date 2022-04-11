const IkologikApi = require("ikologik-api-nodejs");

module.exports = function (RED) {

	function IkologikApiBatchNode(config) {
		RED.nodes.createNode(this, config);

		// Get configuration
		this.name = config.name;
		this.server = RED.nodes.getNode(config.server);
		this.function = config.function;
		this.customerId = config.customerId;
		this.installationId = config.installationId;
		this.batchTypeId = config.batchTypeId;
		this.batchId = config.batchId;
		this.batchCode = config.batchCode;
		this.batchStatus = config.batchStatus;

		// Functionality
		var node = this;
		node.on('input', async function (msg) {
			// Get data
			var customerId = node.customerId ? node.customerId : msg.customerId;
			var installationId = node.installationId ? node.installationId : msg.installationId;
			var batchTypeId = node.batchTypeId ? node.batchTypeId : msg.batchTypeId;
			var batchId = node.batchId ? node.batchId : msg.batchId;
			var batchCode = node.batchCode ? node.batchCode : msg.batchCode;
			var batchStatus = node.batchStatus ? node.batchStatus : msg.batchStatus

			// Execute
			try {
				if (node.function === 'batchGetById') {
					console.log("Getting: "+batchId)
					msg.payload = await node.server.api.batch.getByCustomerAndInstallationAndId(customerId, installationId, batchId);
				} else if (node.function === 'batchGetByCode') {
					msg.payload = await node.server.api.batch.getByCustomerAndInstallationAndBatchTypeAndCode(customerId, installationId, batchTypeId, batchCode);
				} else if (node.function === 'batchCreate') {
					msg.payload = await node.server.api.batch.createByCustomerAndInstallation(customerId, installationId, msg.batch);
				} else if (node.function === 'batchUpdate') {
					msg.payload = await node.server.api.batch.updateByCustomerAndInstallationAndId(customerId, installationId, batchId, msg.batch);
				} else if (node.function === 'batchStatusUpdate') {
					msg.payload = await node.server.api.batch.updateStatusByCustomerAndInstallationAndId(customerId, installationId, batchId, batchStatus);
				} else if (node.function === 'batchDelete') {
					msg.payload = await node.server.api.batch.deleteByCustomerAndInstallationAndId(customerId, installationId, batchId);
				}
				else {
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

	RED.nodes.registerType("ikologik-batch", IkologikApiBatchNode);

}

