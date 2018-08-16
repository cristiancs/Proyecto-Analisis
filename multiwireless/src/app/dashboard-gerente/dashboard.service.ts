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


    getGraph(): Promise<void | Vehiculo[]> {
        return this.http.get(urljoin(this.vehiculosUrl, 'gerente_graph', '?empresa_id='+this.authService.getEmpresa() ))
                .toPromise()
                .then(response => response as Vehiculo[])
                .catch(this.handleError);
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
        console.log(errMsg);

    }

    

}
