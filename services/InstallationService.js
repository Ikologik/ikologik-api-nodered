import IkologikApiCredentials from "../IkologikApiCredentials.js";
import AbstractIkologikCustomerService from "./AbstractIkologikCustomerService.js";
import axios from "axios";
import IkologikException from "../IkologikException.js";

const jwtHelper = new IkologikApiCredentials();

export default class InstallationService extends AbstractIkologikCustomerService{
    constructor(jwtHelper) {
        super(jwtHelper);
    }

    // Crud actions
    getUrl(customer, installation, dataImportType){
        return `${this.jwtHelper.getUrl()}/api/v2/customer/${customer}/installation/`;
    }

    async search(customer, search){
        try{
            const response = await axios.post(`${this.getUrl(customer)}/search`, search, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while searching for a dataimport");
        }
    }
}