
const IkologikApi = require("ikologik-api-nodejs");

module.exports =  function(RED) {
     function IkologikApiNode(config) {
        RED.nodes.createNode(this,config);
        this.customer = config.customer;
        this.installation = config.installation;
        this.credentials = RED.nodes.getNode(config.creds);
        var node = this;
        node.on('input', async function(msg) {
            // Add requested information to msg
            msg.customer = node.customer;
            msg.installation = node.installation;
            const api = await node.credentials.api;
            const dashboard = await api.dashboard.list(this.customer, this.installation);
            const cust = await api.customer.list();
            const report = await api.report.list(this.customer, this.installation);
            msg.dashboard = await dashboard;
            msg.list = await cust;
            msg.report = await report;
            node.send(msg);
        });
    }
    RED.nodes.registerType("ikologik-api",IkologikApiNode
        , {
        credentials:{
            url:{type:"text"},
            username:{type:"text"},
            password:{type:"password"}
        }
        }
    );

      function ApiCredentialsNode (n){
        RED.nodes.createNode(this,n);
        this.url = n.url;
        this.username = n.username;
        this.password = n.password;
        this.api = new IkologikApi(this.url, this.username, this.password);
        this.jwt = this.api.apiCredentials.getJwt();
    }
    RED.nodes.registerType("api-credentials", ApiCredentialsNode);

}
