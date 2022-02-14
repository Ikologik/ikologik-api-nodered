import IkologikApiCredentials from "../IkologikApiCredentials.js";
import AbstractIkologikInstallationService from "./AbstractIkologikInstallationService.js";
import axios from "axios";
import IkologikException from "../IkologikException.js";

const jwtHelper = new IkologikApiCredentials();

export default class ReportService extends  AbstractIkologikInstallationService{
    constructor(jwtHelper) {
        super(jwtHelper);
    }

    // CRUD actions
    getUrl(customer, installation, reportType){
        return `${this.jwtHelper.getUrl()}/api/v2/customer/${customer}/installation/${installation}/reporttype/${reportType}/report`;
    }

    async create(customer, installation, reportType, obj){
        try{
            const response = await axios.post(this.getUrl(customer, installation, reportType), obj, {headers: await this.getHeaders()});
            if (response.status === 201){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (error) {
            return new IkologikException("Error while creating a report");
        }
    }

    async build(customer, installation, reportType){
        try{
            const response = await axios.get(`${this.getUrl(customer, installation, reportType)}/build`, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (error) {
            return new IkologikException("Error while creating a report");
        }
    }

    async updateStatus(customer,installation, reportType, ReportId, status){
        try{
            const response = await axios.put(this.getUrl(customer, installation, reportType)+`/${ReportId}/status`, {status}, {headers: await this.getHeaders({'Content-Type': 'text/plain'})});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while getting the update status for report with id: " +id);
        }
    }

    async upload(customer, installation, reportType, ReportId){
        try{
            const response = await axios.get(`${this.getUrl(customer, installation, reportType)}/${ReportId}/upload`, {data}, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while uploading a report");
        }
    }
}