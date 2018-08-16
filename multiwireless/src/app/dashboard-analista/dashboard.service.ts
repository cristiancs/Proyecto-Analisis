import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../auth/auth.service';

import { Vehiculo } from '../models/vehiculo.model';
import { Enlace } from '../models/enlace.model';

@Injectable()
export class DashboardService {
    private vehiculosUrl: string;
    constructor(private http: HttpClient, private authService: AuthService) {
        this.vehiculosUrl = urljoin(environment.apiUrl, 'vehiculos');
    }


    getVehiculos(): Promise<void | Vehiculo[]> {
        return this.http.get(urljoin(this.vehiculosUrl, '?empresa_id='+this.authService.getEmpresa() ))
                .toPromise()
                .then(response => response as Vehiculo[])
                .catch(this.handleError);
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
        console.log(errMsg);

    }

    getData(data) {
        data.empresa_id = this.authService.getEmpresa();
        const body = JSON.stringify(data);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const url = urljoin(this.vehiculosUrl, 'fetchData');
        return this.http.post(url, body, { headers })
                .map((response: Response) => {
                    this.download(response.url, 'export.csv');
                    return {'status': 'success'};
                })
                .catch((error: Response) => Observable.throw(error));
    }
    download(dataurl, filename) {
        const a = document.createElement('a');
        a.href = dataurl;
        a.setAttribute('download', filename);
        const b = document.createEvent('MouseEvents');
        b.initEvent('click', false, true);
        a.dispatchEvent(b);
        return false;
    }

}
