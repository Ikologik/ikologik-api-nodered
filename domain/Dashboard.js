import AbstractIkologikInstallationsObject from "./AbstractIkologikInstallationsObject.js";

export default class Dashboard extends AbstractIkologikInstallationsObject{
    constructor(customer, installation) {
        super(customer, installation);
        this.name = null;
    }
}