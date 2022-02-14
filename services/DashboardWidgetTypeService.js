import IkologikApiCredentials from "../IkologikApiCredentials.js";
import Search from "../domain/Search.js";
import AbstractIkologikService from "./AbstractIkologikService.js";

const jwtHelper = new IkologikApiCredentials();

export default class DashboardWidgetTypeService extends  AbstractIkologikService{
    constructor(jwtHelper) {
        super(jwtHelper);
    }

    // CRUD actions
    getUrl(){
        return `${this.jwtHelper.getUrl()}/api/v2/dashboardwidgettype`;
    }

    getByName(name){
        const search = new Search();
        search.addFilter("name", "EQ", [name]);
        search.addOrder("name", "ASC");
        search.setPagination(0,1);

        // Query
        const result = this.search(search);
        if (result && result.length == 1 ){
            return result[0];
        }else{
            return null;
        }
    }

    getByType(type){
        const search = new Search();
        search.addFilter("name", "EQ", [type]);
        search.addOrder("name", "ASC");
        search.setPagination(0,1);

        // Query
        const result = this.search(search);
        if (result && result.length == 1 ){
            return result[0];
        }else{
            return null;
        }
    }
}