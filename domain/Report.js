import AbstractIkologikInstallationsObject from "./AbstractIkologikInstallationsObject.js";

export default  class Report extends AbstractIkologikInstallationsObject{
    constructor(customer, installation) {
        super(customer, installation);
        this.type = null;
        this.lastProcessing = null;
        this.nextProcessing = null;
        this.lockedUntil = null;
        this.reportType = null;
        this.date = null;
        this.title = null;
        this.fileName = null;
        this.contentType = null;
        this.comment = null;
        this.sendReviewNotifications = null;
        this.sendNotifications = null;
        this.user = null;
        this.status = null;
        this.fields = null;

    }
}