import AbstractIkologikCustomerObject from "./AbstractIkologikCustomerObject.js";

export default class AbstractIkologikInstallationsObject extends AbstractIkologikCustomerObject {
    constructor(customer, installation){
        super(customer);
        this.installation = installation;
    }
}