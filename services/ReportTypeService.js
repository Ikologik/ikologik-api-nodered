import IkologikApiCredentials from "../IkologikApiCredentials.js";
import AbstractIkologikInstallationService from "./AbstractIkologikInstallationService.js";

const jwtHelper = new IkologikApiCredentials();

export default class ReportTypeService extends  AbstractIkologikInstallationService{
    constructor(jwtHelper) {
        super(jwtHelper);
    }

    // CRUD actions
    getUrl(customer, installation){
        return `${this.jwtHelper.getUrl()}/api/v2/customer/${customer}/installation/${installation}/reporttype`;
    }

}