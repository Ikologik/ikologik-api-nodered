import IkologikApiCredentials from "../IkologikApiCredentials.js";
import AbstractIkologikInstallationService from "./AbstractIkologikInstallationService.js";
import axios from "axios";
import IkologikException from "../IkologikException.js";

const jwtHelper = new IkologikApiCredentials();

export default class TagAlertTypeService extends  AbstractIkologikInstallationService{
    constructor(jwtHelper) {
        super(jwtHelper);
    }

    // CRUD actions
    getUrl(customer, installation, tag){
        return `${this.jwtHelper.getUrl()}/api/v2/customer/${customer}/installation/${installation}/tag/${tag}/tagalerttype/update`;
    }

    async update(customer, installation, tag, obj){
        try{
            const response = await axios.post(this.getUrl(customer, installation, tag), obj, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while updating the tagalert type");
        }
    }
}