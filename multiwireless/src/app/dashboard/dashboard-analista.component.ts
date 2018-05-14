import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { DashboardService } from './dashboard.service';
import { Vehiculo } from './vehiculo.model';
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
    loading = true;

    ngOnInit() {
        this.dashboardService
            .getVehiculos()
            .then((vehiculos: Vehiculo[]) => {
                    this.vehiculos = vehiculos;
                    this.loading = false;
                });
        }
}
