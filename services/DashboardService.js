import IkologikApiCredentials from "../IkologikApiCredentials.js";
import Search from "../domain/Search.js";
import AbstractIkologikInstallationService from "./AbstractIkologikInstallationService.js";

const jwtHelper = new IkologikApiCredentials();

export default class DashboardService extends  AbstractIkologikInstallationService{
    constructor(jwtHelper) {
        super(jwtHelper);
    }

    // CRUD actions
    getUrl(customer, installation){
        return `${this.jwtHelper.getUrl()}/api/v2/customer/${customer}/installation/${installation}/dashboard`;
    }

    getByName(customer, installation, name ){
        const search = new Search();
        search.addFilter("name", "EQ", [name]);
        search.addOrder("name", "ASC");
        search.setPagination(0,1);

        // Query
        const result = this.search(customer, installation, search);
        if (result && result.length == 1 ){
            return result[0];
        }else{
            return null;
        }
    }
}