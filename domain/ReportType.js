import AbstractIkologikInstallationsObject from "./AbstractIkologikInstallationsObject.js";

export default class ReportType extends AbstractIkologikInstallationsObject{
    constructor(customer, installation) {
        super(customer, installation);
        this.type = null;
        this.outputType = null;
        this.name = null;
        this.title = null;
        this.fileName = null;
        this.contentType = null;
        this.comment = null;
        this.scheduleActive = null;
        this.schedule = null;
        this.dateEditable = null;
        this.titleEditable = null;
        this.filenameEditable = null;
        this.reviewEnabled = null;
        this.reviewReceivers = null;
        this.reviewReceiversSendRequired = null;
        this.notificationReceivers = null;
        this.notificationReceiversSendRequired = null;
    }
}