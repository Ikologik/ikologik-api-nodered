
import IkologikApiCredentials from "../IkologikApiCredentials.js";
import axios from "axios";
import IkologikException from "../IkologikException.js";

const jwtHelper = new IkologikApiCredentials();

export default class AbstractIkologikService{
    constructor(jwtHelper) {
        this.jwtHelper = jwtHelper;
    }

    // Crud actions
    async getHeaders(default_headers=null){
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await this.jwtHelper.getJwt()}`
        }
        if (default_headers !== null){
            headers = {...headers, ...default_headers};
        }
        return headers;
    }
    getUrl(){}

    async getById(id){
        try{
            const response = await axios.get(this.getUrl()+`/${id}`, { headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else {
                return new IkologikException("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while getting by id");
        }
    }

    async list(){
        try{
            const response = axios.get(this.getUrl(), { headers : await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        } catch (e) {
            return new IkologikException("Error while listing");
        }
    }

    async search(search){
        try{
            const response = await axios.post(this.getUrl(), search, {headers: await this.getHeaders()})
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while searching");
        }
    }

    async create(obj){
        try{
            const response = await axios.post(this.getUrl(), obj, {headers: await this.getHeaders()});
            if (response.status === 201){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (error) {
            return new IkologikException("Error while creating");
        }
    }

    async update(id, obj){
        try{
            const response = await axios.put(this.getUrl()+`/${id}`, obj, {headers: await this.getHeaders()});
            if (response.status === 200){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while updating");
        }
    }

    async delete(id){
        try{
            const response = await axios.delete(`${this.getUrl()}/${id}`,  {headers: await this.getHeaders()});
            if (response.status === 204){
                const result = response.data;
                return result;
            } else{
                return new IkologikException ("Request returned status" + toString(response.status));
            }
        }catch (e) {
            return new IkologikException("Error while deleting");
        }
    }


}