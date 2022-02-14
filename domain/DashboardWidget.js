import AbstractIkologikInstallationsObject from "./AbstractIkologikInstallationsObject.js";

export default class DashboardWidget extends AbstractIkologikInstallationsObject{
    constructor(customer, installation, dashboard) {
        super(customer, installation);
        this.dasboard = dashboard;
        this.dashboardWidgetType = null;
        this.type = null;
        this.order = null;
        this.parameters = {};
    }
}
export default class Parameter{
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
}