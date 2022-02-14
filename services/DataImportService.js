
import IkologikApiCredentials from "../IkologikApiCredentials.js";

import axios from "axios";
import Search from "../domain/Search.js";
import AbstractIkologikInstallationService from "./AbstractIkologikInstallationService.js";
import IkologikException from "../IkologikException.js";

const jwtHelper = new IkologikApiCredentials();

export default class DataImportService extends AbstractIkologikInstallationService{
    constructor(jwtHelper) {
        super(jwtHelper);
    }

    // Crud actions
    getUrl(customer, installation, dataImportType){
        return `${this.jwtHelper.getUrl()}/api/v2/customer/${customer}/installation/${installation}/dataimporttype/${dataImportType}/dataimport`;
    }

    async list(customer, installation, dataImportType){
        try{
            const response = await axios.get(`${this.getUrl(customer, installation, dataImportType)}/search`, { headers : await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while listing  the dataimport");
        }
    }

    async getById(customer,installation, dataImportType, id){
        try{
            const response = await axios.get(this.getUrl(customer, installation, dataImportType)+`/${id}`, { headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while getting dataimport with id: " +id);
        }
    }

    async search(customer, installation, dataImportType, search){
        try{
            const response = await axios.post(`${this.getUrl(customer, installation, dataImportType)}/search`, search, {headers: await this.getHeaders()});
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

    async create(customer, installation, dataImportType, obj){
        try{
            const response = await axios.post(this.getUrl(customer, installation, dataImportType), obj, {headers: await this.getHeaders()});
            if (response.status === 201){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (error) {
            return new IkologikException("Error while creating a dataimport");
        }
    }

    async update(customer, installation, dataImportType, obj){
        try{
            const response = await axios.put(`${this.getUrl(customer, installation, dataImportType)}/${obj.id}`, obj, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while updating a dataimport");
        }
    }

    async delete(customer,installation, dataImportType, id){
        try{
            const response = await axios.delete(`${this.getUrl(customer, installation, dataImportType)}/${id}`,  {headers: await this.getHeaders()});
            if (response.status === 204){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while deleting a dataimport");
        }
    }

    async updateStatus(customer,installation, dataImportType, id, status){
        try{
            const response = await axios.put(this.getUrl(customer, installation, dataImportType)+`/${id}/status`, {status}, {headers: await this.getHeaders({'Content-Type': 'text/plain'})});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while getting the update status for dataimport with id: " +id);
        }
    }

    async updateError(customer,installation, dataImportType, id, error){
        try{
            const response = await axios.put(this.getUrl(customer, installation, dataImportType)+`/${id}/error`, {error}, {headers: await this.getHeaders({'Content-Type': 'text/plain'})});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while getting the update error for dataimport with id: " +id);
        }
    }

    getByName(customer, installation, name){
        const search = new Search();
        search.addFilter("name", "EQ", [name]);
        search.addOrder("name", "ASC");

        // Query
        const result = this.search(customer, installation, dataImportType, search);
        if (result && result.length == 1 ){
            return result[0];
        }else{
            return null;
        }
    }
}