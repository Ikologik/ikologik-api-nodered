import AbstractIkologikObject from "./AbstractIkologikObject.js";

export default class TagAlertType extends AbstractIkologikObject{
    constructor() {
        super();
        this.meter = null;
        this.value = null;
        this.type = null;
        this.severity = null;
        this.message = null;
        this.autoAcknowledge = null;
        this.active = null;
        this.activationMessageEnabled = null;
        this.activationMessage = null;
        this.deactivationMessageEnabled = null;
        this.deactivationMessage = null;
        this.availabilityRelated = null;
        this.operationRelated = null;
        this.connectivityRelated = null;
        this.notificationReceivers = null;
    }
}