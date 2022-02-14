import AbstractIkologikInstallationsObject from "./AbstractIkologikInstallationsObject.js";

export default class Batch extends AbstractIkologikInstallationsObject {
    constructor(customer, installation) {
        super(customer, installation);
        this.batchType = null;
        this.code = null;
        this.description = null;
        this.status = null;
        this.startDate = null;
        this.endDate = null;
        this.active = null;
        this.fields = null;
    }
}

export default class BatchField {
    constructor() {
        this.stringValue = null;
        this.booleanValue = null;
        this.numberValue = null;
        this.dateValue = null;
        this.timeValue = null;
        this.dateTimeValue = null;
        this.LookupListValue = null;
    }
}