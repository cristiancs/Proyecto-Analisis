import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'app-dashboard-analista',
    templateUrl: './app-dashboard-analista.component.html'
})
export class DashboardAnalistaComponent{
    toppings = new FormControl();
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
}