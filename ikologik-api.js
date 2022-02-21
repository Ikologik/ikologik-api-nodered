
const IkologikApi = require("ikologik-api-nodejs");

module.exports = function(RED) {
    function IkologikApiNode(config) {
        RED.nodes.createNode(this,config);
        this.customer = config.customer;
        this.installation = config.installation;
        this.credentials = RED.nodes.getNode(config.creds);
        var url = this.credentials.url;
        var username = this.credentials.username;
        var password = this.credentials.password;
        var node = this;
        node.on('input', async function(msg) {
            // msg.credentials = this.credentials;
            // msg.customer = node.customer;
            // msg.installation = node.installation;
            // const api = this.credentials.api;
            // // api.apiCredentials.getJwt().then((jwt) => {
            // //     api.dashboard.list(node.customer, node.installation).then((dashboard) => {
            // //         msg.payload = dashboard;
            // //         node.send(msg);
            // //     });
            // //
            // // });
            // (async function(){
            //     const jwt = await api.apiCredentials.getJwt();
            //     console.log(jwt, 'jwt async')
            //     const dashboard = await api.dashboard.list('5cd2e00f26d108a3e282985a', '6170221a70c06546081c0110')
            //     console.log(dashboard,'dashboard')
            //     msg.payload = dashboard;
            //     node.send(msg);
            // })();
            msg.customer = node.customer;
            msg.installation = node.installation;
            const api = new IkologikApi('http://127.0.0.1:8080', 'ikologik', 'LaatDeRidderBinnen1234!');
            const jwt = await api.apiCredentials.getJwt();
            console.log(jwt, 'jwt async')
            const dashboard = await api.dashboard.list('5cd2e00f26d108a3e282985a', '6170221a70c06546081c0110')
            console.log(dashboard,'dashboard')
            const cust = await api.customer.list();
            console.log(cust, 'cust')
            const report = await api.report.list('5cd2e00f26d108a3e282985a', '6170221a70c06546081c0110')
            console.log(report, 'report')
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

    }
    RED.nodes.registerType("api-credentials", ApiCredentialsNode);

}
