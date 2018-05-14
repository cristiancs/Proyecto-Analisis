import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';


import { Vehiculo } from './vehiculo.model';
import { Enlace } from './enlace.model';

@Injectable()
export class DashboardService {
    private vehiculosUrl: string;
    constructor(private http: HttpClient) {
        this.vehiculosUrl = urljoin(environment.apiUrl, 'vehiculos?empresa_id=1');
    }


    getVehiculos(): Promise<void | Vehiculo[]> {
        return this.http.get(this.vehiculosUrl)
                .toPromise()
                .then(response => response as Vehiculo[])
                .catch(this.handleError);
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
        console.log(errMsg);

    }

    getData(): Promise<void | Enlace> {
        const url = urljoin(this.vehiculosUrl, '?empresas_id=1');
        return this.http.get(url)
                .toPromise()
                .then(response => { 
                    this.download(response.url, 'export.csv');
                    return 'success';
                })
                .catch(this.handleError);
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
