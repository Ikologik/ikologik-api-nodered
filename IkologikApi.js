import IkologikApiCredentials from "./IkologikApiCredentials.js";
import AlertService from "./services/AlertService.js";
import AlertTypeService from "./services/AlertTypeService.js";
import BatchService from "./services/BatchService.js";
import BatchTypeService from "./services/BatchTypeService.js";
import DashboardService from "./services/DashboardService.js";
import DashboardWidgetService from "./services/DashboardWidgetService.js";
import DashboardWidgetTypeService from "./services/DashboardWidgetTypeService.js";
import DataImportService from "./services/DataImportService.js";
import DataImportTypeService from "./services/DataImportTypeService.js";
import InstallationService from "./services/InstallationService.js";
import ReportService from "./services/ReportService.js";
import TagService from "./services/TagService.js";
import TagAlertTypeService from "./services/TagAlertTypeService.js";
import ReportTypeService from "./services/ReportTypeService.js";

export default class IkologikApi {
    constructor(url, username, password) {
        this.apiCredentials = new IkologikApiCredentials(url, username, password);
        this.alert = new AlertService(this.apiCredentials);
        this.alertType = new AlertTypeService(this.apiCredentials);
        this.batch = new BatchService(this.apiCredentials);
        this.batchType = new BatchTypeService(this.apiCredentials);
        this.dashboard = new DashboardService(this.apiCredentials);
        this.dashboardWidget = new DashboardWidgetService(this.apiCredentials);
        this.dashboardWidgetType = new DashboardWidgetTypeService(this.apiCredentials);
        this.dataImport = new DataImportService(this.apiCredentials);
        this.dataImportType = new DataImportTypeService(this.apiCredentials);
        this.installation = new InstallationService(this.apiCredentials);
        this.report = new ReportService(this.apiCredentials);
        this.reportType= new ReportTypeService(this.apiCredentials);
        this.tag = new TagService(this.apiCredentials);
        this.tagAlertType = new TagAlertTypeService(this.apiCredentials);
    }
}