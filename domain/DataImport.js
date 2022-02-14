import AbstractIkologikInstallationsObject from "./AbstractIkologikInstallationsObject.js";

export default class DataImport extends AbstractIkologikInstallationsObject {
    constructor(customer, installation){
        super(customer, installation);
        this.name = null;
        this.status = null;
        this.active = null;
        this.parameters = {};
    }
}