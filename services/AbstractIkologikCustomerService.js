import IkologikApiCredentials from "../IkologikApiCredentials.js";
import AbstractIkologikService from "./AbstractIkologikService.js";

import axios from "axios";
import IkologikException from "../IkologikException.js";

const jwtHelper = new IkologikApiCredentials();

export default class AbstractIkologikCustomerService extends AbstractIkologikService{
    constructor(jwtHelper) {
        super(jwtHelper);
        this.jwtHelper = jwtHelper;
    }

    // Crud actions
    getUrl(customer){}

    async getById(customer, id){
        try{
            const response = await axios.get(this.getUrl(customer)+`/${id}`, { headers: await this.getHeaders()});
            if (response.status === 200){
                const result = JSON.stringify(response.data);
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while getting customer with id: " +id);
        }
    }

    async list(customer){
        try{
            const response = await axios.get(this.getUrl(customer), { headers : await this.getHeaders()});
            if (response.status === 200){
                const result = JSON.stringify(response.data);
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while listing customer");
        }
    }

    async search(customer, search){
        try{
            const response = axios.post(this.getUrl(customer), search, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while searching for a customer");
        }
    }

    async create(customer, obj){
        try{
            const response = await axios.post(this.getUrl(customer), obj, {headers: await this.getHeaders()});
            if (response.status === 201){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (error) {
            return new IkologikException("Error while creating a customer");
        }
    }

    async update(customer, id, obj){
        try{
            const response = await axios.put(`${this.getUrl(customer)}/${id}`, obj, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while updating a customer");
        }
    }

    async delete(customer, id){
        try{
            const response = await axios.delete(`${this.getUrl(customer)}/${id}`,  {headers: await this.getHeaders()});
            if (response.status === 204){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while deleting a customer");
        }
    }
}