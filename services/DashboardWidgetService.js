import IkologikApiCredentials from "../IkologikApiCredentials.js";

import axios from "axios";
import AbstractIkologikInstallationService from "./AbstractIkologikInstallationService.js";
import IkologikException from "../IkologikException.js";

const jwtHelper = new IkologikApiCredentials();

export default class DashboardWidgetService extends AbstractIkologikInstallationService{
    constructor(jwtHelper) {
        super(jwtHelper);
        this.jwtHelper = jwtHelper;
    }

    // Crud actions
    getUrl(customer, installation, dashboard){
        return `${this.jwtHelper.getUrl()}/api/v2/customer/${customer}/installation/${installation}/dashboard/${dashboard}/widget`;
    }

    async list(customer, installation, dashboard){
        try{
            const response = await axios.get(`${this.getUrl(customer, installation, dashboard)}/search`, { headers : await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while listing  the dashboardwidget");
        }
    }

    async search(customer, installation, search){
        try{
            const response = await axios.post(`${this.getUrl(customer, installation, dashboard)}/search`, search, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while searching for a dashboardwidget");
        }
    }

    async create(customer, installation, dashboard, obj){
        try{
            const response = await axios.post(this.getUrl(customer, installation, dashboard), obj, {headers: await this.getHeaders()});
            if (response.status === 201){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (error) {
            return new IkologikException("Error while creating a dashboardwidget");
        }
    }

    async update(customer, installation, dashboard, obj){
        try{
            const response = await axios.put(`${this.getUrl(customer, installation, dashboard)}/${obj.id}`, obj, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while updating a dashboardwidget");
        }
    }

    async delete(customer,installation, dashboard, id){
        try{
            const response = await axios.delete(`${this.getUrl(customer, installation, dashboard)}/${id}`,  {headers: await this.getHeaders()});
            if (response.status === 204){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while deleting a dashboardwidget");
        }
    }
}