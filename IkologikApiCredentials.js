import axios from 'axios';
import IkologikException from "./IkologikException.js";
import https from "https";

 export default class IkologikApiCredentials {
     // jwt;

    constructor( url, username, password) {
        this.url = url;
        this.username = username;
        this.password = password
        this.jwt = null;
        this.jwtExpirationDate = null;
    }

    getUrl (){
        return this.url;
    }

    getUsername (){
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    async getJwt() {
        try {
            if (this.jwt == null || this.jwtExpirationDate < (new Date().getTime() * 1000)) {

                // Prepare the headers
                const headers = {
                    'Content-Type': 'application/json'
                }

                // Prepare the data
                const data = {
                    'username': this.username,
                    'password': this.password
                };

                const ignoreSSL = axios.create({
                    httpsAgent: new https.Agent({
                        rejectUnauthorized: false
                    })
                });

                // Selectively ignore SSL when AXIOS requests
                const agent = new https.Agent({
                    rejectUnauthorized: false
                });
                // Execute
                const response = await axios.post(`${this.url}/api/v2/auth/login`, data, {headers: headers, httpsAgent:agent})
                if (response.status === 200){
                    const result = response.data;
                    this.jwt = result.accessToken;
                    this.jwtExpirationDate = result.expiresAt;
                    return this.jwt;
                }else{
                    return new IkologikException("Request returned status" + toString(await response.status));
                }
            }else{
                return this.jwt;
            }
        }catch{
            return new IkologikException("Error while getting jwt token");
        }
    }
}


