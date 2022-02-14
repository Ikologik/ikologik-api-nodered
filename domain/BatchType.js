import AbstractIkologikInstallationsObject from "./AbstractIkologikInstallationsObject.js";

export default class BatchType extends AbstractIkologikInstallationsObject{
    constructor(customer, installation) {
        super(customer, installation);
        this.name = null;
    }
}