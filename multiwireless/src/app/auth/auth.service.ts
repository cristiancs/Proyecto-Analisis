import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';

import * as moment from "moment";

import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
     
    constructor(private http: HttpClient) {
    }
      
    login(email:string, password:string ) {
        return this.http.post(urljoin(environment.apiUrl, 'auth/login'), {email, password})
            .shareReplay()
           
    }

          
    setSession(authResult) {
    	console.log("Called");
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
    getRole() {
    	return jwtDecode(localStorage.getItem("id_token")).role;
    }
    getEmpresa() {
    	return jwtDecode(localStorage.getItem("id_token")).empresa;
    }


    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}
          