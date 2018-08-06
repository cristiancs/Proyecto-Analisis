import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';

import { DashboardService } from './dashboard.service';
import { Vehiculo } from '../models/vehiculo.model';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
@Component({
    selector: 'app-dashboard-analista',
    templateUrl: './app-dashboard-analista.component.html',
    styleUrls: ['./app-dashboard-analista.component.css'],
    providers: [ DashboardService ]
})
export class DashboardAnalistaComponent implements OnInit{
    constructor(private dashboardService: DashboardService) {}

   
    ListaDatos = ['Asset_id',
        'Ts',
        'Dev_id',
        'Odometer',
        'Total fuel*1',
        'Engine hours',
        'Actual speed',
        'Actual engine speed',
        'Actual engine torque',
        'Kick down switch',
        'Accelerator pedal position',
        'Brake switch',
        'Clutch switch',
        'Cruise active',
        'PTO active *2',
        'Fuel level',
        'Engine Temperatura',
        'Turbo pressure',
        'Axle weight 0',
        'Axle weight 1',
        'Axle weight 2'
    ];

    vehiculos: Vehiculo[];
    loading: boolean;

    ngOnInit() {
        this.loading = true;
        this.dashboardService
            .getVehiculos()
            .then((vehiculos: Vehiculo[]) => {
                    this.vehiculos = vehiculos;
                    this.loading = false;
            });
    }

    onSubmit(form: NgForm){
        console.log(form.value);
        this.dashboardService.getData(form.value)
        .subscribe(
            status => {status === 'succes' ? console.log("Descarga Realizada") : console.log(status)},
            error => {console.warn(error)}
        );
    }
}
