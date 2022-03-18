
const IkologikApi = require("ikologik-api-nodejs");

module.exports =  function(RED) {
    // BatchType-node
     function IkologikBatchTypeNode(config) {
        RED.nodes.createNode(this,config);
        // Get configuration from node
        this.customerId = config.batchTypeCustomerId;
        this.installationId = config.batchTypeInstallationId;
        this.batchTypeId = config.batchTypeId;
        this.batchTypeName = config.batchTypeName;
        this.function = config.batchTypeFunction;
        this.credentials = RED.nodes.getNode(config.batchTypeCredentials);
        var node = this;

         // Functionality of node
        node.on('input', async function(msg) {
            // If input from node choose input, otherwise get info from message
            var customerId = node.customerId ? node.customerId : msg.customerId;
            var installationId = node.installationId ? node.installationId : msg.installationId;
            var batchTypeId = node.batchTypeId ? node.batchTypeId : msg.batchTypeId;
            var batchTypeName = node.batchTypeName ? node.batchTypeName : msg.batchTypeName;

            // Use Ikologik-api for requests
            // ! batchTypeName is hard-coded ! Pay attention when changing to a new batchTypeName
            const api = await node.credentials.api;
            if(node.function === 'batchTypeGetByName'){
                msg.payload = await api.batchType.getByName(customerId, installationId,batchTypeName);
            }else if(node.function === 'batchTypeList'){
                msg.payload = await api.batchType.list(customerId, installationId);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("ikologik-batchType", IkologikBatchTypeNode);



     // Batchtypefield-node
    function IkologikApiBatchFieldNode(config) {
        RED.nodes.createNode(this,config);
        // Get configuration from node
        this.customerId = config.batchFieldTypeCustomerId;
        this.installationId = config.batchFieldTypeInstallationId;
        this.batchFieldTypeId = config.batchFieldTypeId;
        this.batchFieldTypeBatchTypeId = config.batchFieldTypeBatchTypeId;
        this.function = config.batchFieldTypeFunction;
        this.credentials = RED.nodes.getNode(config.batchFieldTypeCredentials);
        var node = this;

        // Functionality of node
        node.on('input', async function(msg) {
            // If input from node choose input, otherwise get info from message
             var customerId = node.customerId ? node.customerId : msg.customerId;
             var installationId = node.installationId ? node.installationId : msg.installationId;
             var batchFieldTypeId = node.batchFieldTypeId ? node.batchFieldTypeId : msg.batchFieldTypeId;
             var batchTypeId = node.batchFieldTypeBatchTypeId ? node.batchFieldTypeBatchTypeId : msg.batchTypeId;

            // Use Ikologik-api for requests
            const api = await node.credentials.api;
            if(node.function === 'batchFieldTypeGet'){
                msg.payload = await api.batchFieldType.getById(customerId, installationId,batchTypeId, batchFieldTypeId);
            }else if(node.function === 'batchFieldTypeList'){
                msg.payload = await api.batchFieldType.list(customerId, installationId, batchTypeId);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("ikologik-batchFieldType", IkologikApiBatchFieldNode);



    // Batch-node
    function IkologikApiBatchNode(config) {
        RED.nodes.createNode(this,config);
        // Get configuration from node
        this.customerId = config.batchCustomerId;
        this.installationId = config.batchInstallationId;
        this.batchTypeId = config.batchBatchTypeId;
        this.batchId = config.batchId;
        this.batchCode = config.batchCode;
        this.batchStatus = config.batchStatus;
        this.function = config.batchFunction;
        this.credentials = RED.nodes.getNode(config.batchCredentials);
        var node = this;

        // Functionality of node
        node.on('input', async function(msg) {
            // If input from node choose input, otherwise get info from message
            var customerId = node.customerId ? node.customerId : msg.customerId;
            var installationId = node.installationId ? node.installationId : msg.installationId;
            var batchTypeId = node.batchTypeId ? node.batchTypeId : msg.batchTypeId;
            var batchStatus = node.batchStatus ? node.batchStatus : msg.batchStatus;
            var batchId = node.batchId ? node.batchId : msg.batchId;

            // Use Ikologik-api for requests
            const api = await node.credentials.api;
            if(node.function === 'batchGetById'){
                msg.payload = await api.batch.getById(customerId, installationId, batchId);
            }else if(node.function === 'batchGetByCode'){
                msg.payload = await api.batch.getByCode(customerId, installationId, batchTypeId, batchCode);
            }else if(node.function === 'batchCreate'){
                msg.payload = await api.batch.create(customerId, installationId, msg.batch);
            }else if(node.function === 'batchUpdate'){
                msg.payload = await api.batch.update(customerId, installationId, batchId, msg.batch);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("ikologik-batch", IkologikApiBatchNode);



    // BatchTrace-node
    function IkologikApiBatchTraceNode(config) {
        RED.nodes.createNode(this,config);
        // Get configuration from node
        this.customerId = config.batchTraceCustomerId;
        this.installationId = config.batchTraceInstallationId;
        this.batchId = config.batchTraceBatchId;
        this.batchTraceId = config.batchTraceId;
        this.function = config.batchTraceFunction;
        this.credentials = RED.nodes.getNode(config.batchTraceCredentials);
        var node = this;

        // Functionality of node
        node.on('input', async function(msg) {
            // If input from node choose input, otherwise get info from message
            var customerId = node.customerId ? node.customerId : msg.customerId;
            var installationId = node.installationId ? node.installationId : msg.installationId;
            var batchId = node.batchId ? node.batchId : msg.batchId;
            var batchTraceId = node.batchTraceId ? node.batchTraceId : msg.batchTraceId;

            // Use Ikologik-api for requests
            const api = await node.credentials.api;
            if(node.function === 'batchTraceGetById'){
                msg.payload = await api.batchTrace.getById(customerId, installationId, batchId, batchTraceId);
            }else if(node.function === 'batchTraceList'){
                msg.payload = await api.batchTrace.list(customerId, installationId, batchId);
            }else if(node.function === 'batchTraceCreate'){
                msg.payload = await api.batchTrace.create(customerId, installationId, batchId, msg.batchTrace);
            }else if(node.function === 'batchTraceUpdate'){
                msg.payload = await api.batchTrace.update(customerId, installationId, batchId, batchTraceId, msg.batchTrace);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("ikologik-batchTrace", IkologikApiBatchTraceNode);



    // Credentials
      function ApiCredentialsNode (n){
        RED.nodes.createNode(this,n);
        this.url = n.url;
        this.username = n.username;
        this.password = n.password;
        this.api = new IkologikApi(this.url, this.username, this.password);
        // this.jwt = this.api.apiCredentials.getJwt();
    }
    RED.nodes.registerType("api-credentials", ApiCredentialsNode);

}
