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

   
    ListaDatos = ['time',
        'ns1',
        'imei',
        'ns2',
        'odometer',
        'total_fuel',
        'engine_hours',
        'actual_speed',
        'actual_engine_speed',
        'engine_torque',
        'kick_down_switch',
        'accelerator_pedal',
        'brake_switch',
        'clutch_switch',
        'cruise_active',
        'pto_active',
        'fuel_level',
        'engine_temperature',
        'turbo_presure',
        'axle_0',
        'axle_1',
        'axle_2',
        'axle_3',
        'service_distance',
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

    onSubmit(form: NgForm, id: Number){
        form.value.id = id;
        this.dashboardService.getData(form.value)
        .subscribe(
            status => {status === 'succes' ? console.log("Descarga Realizada") : console.log(status)},
            error => {console.warn(error)}
        );
    }
}
