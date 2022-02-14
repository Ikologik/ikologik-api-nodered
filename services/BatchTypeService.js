import IkologikApiCredentials from "../IkologikApiCredentials.js";
import Search from "../domain/Search.js";
import AbstractIkologikInstallationService from "./AbstractIkologikInstallationService.js";

const jwtHelper = new IkologikApiCredentials();

export default class BatchTypeService extends  AbstractIkologikInstallationService{
    constructor(jwtHelper) {
        super(jwtHelper);
    }

    // CRUD actions
    getUrl(customer, installation){
        return `${this.jwtHelper.getUrl()}/api/v2/customer/${customer}/installation/${installation}/batchtype`;
    }

    getByName(customer, installation, name ){
        const search = new Search();
        search.addFilter("name", "EQ", [name]);
        search.addOrder("name", "ASC");

        // Query
        const result = this.search(customer, installation, search);
        if (result && result.length == 1 ){
            return result[0];
        }else{
            return null;
        }
    }
}