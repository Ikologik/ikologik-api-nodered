
const IkologikApi = require("ikologik-api-nodejs");
const Batch = require("ikologik-api-nodejs/domain/Batch");

const functions = {
    batchtypeGet:{
        customerRequired:false,
        installationRequired:false,
        idRequired: true,
    },
    installationGet:{
        customerRequired:true,
        installationRequired: false,
        idRequired: true,
    }
}

module.exports =  function(RED) {
    // BatchType-node
     function IkologikBatchTypeNode(config) {
        RED.nodes.createNode(this,config);
        this.customer = config.customer;
        this.installation = config.installation;
        this.id = config.id;
        this.function = config.function;
        this.credentials = RED.nodes.getNode(config.creds);
        var node = this;
        node.on('input', async function(msg) {
            // Add requested information to msg
            //TODO: change msg.customer to var customer + line 36 etc
            msg.customer = node.customer ? node.customer : msg.customer;
            msg.installation = node.installation ? node.installation : msg.installation;
            msg.id = node.id ? node.id : msg.id;
            const api = await node.credentials.api;
            if(node.function == 'batchtypeGet'){
                msg.payload = await api.batchType.getByName(msg.customer, msg.installation,"Verpakking");
            }else if(node.function == 'batchtypeList'){
                msg.payload = await api.batchType.list(node.customer, node.installation);
            }
            const dashboard = await api.dashboard.list(this.customer, this.installation);

            const report = await api.report.list(this.customer, this.installation);
            msg.dashboard = await dashboard;
            msg.report = await report;
            node.send(msg);
        });
    }
    RED.nodes.registerType("ikologik-batchType",IkologikBatchTypeNode);

     // Batchtypefield-node
    function IkologikApiBatchFieldNode(config) {
        RED.nodes.createNode(this,config);
        this.customer = config.cust;
        this.installation = config.install;
        this.id = config.batchFieldTypeID;
        this.function = config.funct;
        this.credentials = RED.nodes.getNode(config.credens);
        var node = this;
        node.on('input', async function(msg) {
            // Add requested information to msg
            // if input customer, choose input otherwise get customer from context
            msg.customer = node.customer ? node.customer : msg.customer;
            msg.installation = node.installation ? node.installation : msg.installation;
            msg.id = node.id;
            const api = await node.credentials.api;
            if(node.function == 'batchfieldtypeGet'){
                msg.payload = await api.batchFieldType.getByID(msg.customer, msg.installation,msg.batchTypeID,node.id);
            }else if(node.function == 'batchfieldtypeList'){
                msg.payload = await api.batchFieldType.list(msg.customer, msg.installation,msg.batchTypeID);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("ikologik-batchFieldType",IkologikApiBatchFieldNode);

    // Batch-node
    function IkologikApiBatchNode(config) {
        RED.nodes.createNode(this,config);
        this.customer = config.custID;
        this.installation = config.installID;
        this.id = config.batchID;
        this.function = config.func;
        this.credentials = RED.nodes.getNode(config.cred);
        var node = this;
        node.on('input', async function(msg) {
            // Add requested information to msg
            // if input , choose input otherwise get from context
            var customer = node.customer ? node.customer : msg.customerId;
            var installation = node.installation ? node.installation : msg.installationId;
            var batchTypeId = node.batchTypeId ? node.batchTypeId : msg.batchTypeId;
            var code = node.id ? node.id : msg.code;

            const api = await node.credentials.api;
            if(node.function == 'batchGetByID'){
                msg.payload = await api.batch.getByID(customer, installation,code);
            }else if(node.function == 'batchGetByCode'){
                msg.payload = await api.batch.getByCode(customer,installation, batchTypeId,code);
            }else if(node.function == 'batchCreate'){
                msg.payload = await api.batch.create(customer, installation,msg.batch);
            }else if(node.function == 'batchUpdate'){
                msg.payload = await api.batch.update(customer, installation,msg.payload.id, msg.batch);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("ikologik-batch",IkologikApiBatchNode);

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
