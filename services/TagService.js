import IkologikApiCredentials from "../IkologikApiCredentials.js";
import AbstractIkologikInstallationService from "./AbstractIkologikInstallationService.js";
import axios from "axios";
import IkologikException from "../IkologikException.js";

const jwtHelper = new IkologikApiCredentials();

export default class TagService extends  AbstractIkologikInstallationService{
    constructor(jwtHelper) {
        super(jwtHelper);
    }

    // CRUD actions
    getUrl(customer, installation, reportType){
        return `${this.jwtHelper.getUrl()}/api/v2/customer/${customer}/installation/${installation}/tag`;
    }

    async create(customer, installation, obj){
        try{
            const response = await axios.post(this.getUrl(customer, installation, reportType), obj, {headers: await this.getHeaders()});
            if (response.status === 201){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (error) {
            return new IkologikException("Error while creating a tag");
        }
    }
}