import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import { Chart } from 'chart.js';
import { DashboardService } from './dashboard.service';
import { Vehiculo } from '../models/vehiculo.model';
import { ChartModel } from '../models/ChartModel.model';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
@Component({
    selector: 'app-dashboard-jefe-de-flota',
    templateUrl: './app-dashboard-jefe-de-flota.component.html',
    styleUrls: ['./app-dashboard-jefe-de-flota.component.css'],
    providers: [ DashboardService ]
})
export class DashboardJefeDeFlotaComponent implements OnInit{
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
    charts: {};
    loading: boolean;
    ngOnInit() {
        this.charts = {};
        this.loading = true;
        this.dashboardService
        .getVehiculos()
        .then((vehiculos: Vehiculo[]) => {
            this.vehiculos = vehiculos;
            this.loading = false;
        });
    }
    tieneGrafico(id) {
        return id.toString() in this.charts;
    }

    getChart(id){
        if(this.tieneGrafico(id)){
            return;
        }
        this.dashboardService
        .requestChart({id})
        .then((charts: any{}) => {
            this.charts[id] = true;
            setTimeout(() => {
                this.charts[id] = new Chart(document.getElementById("chartContainer-"+id), {
                  type: 'line',
                  data: {
                    labels: charts.horas,
                    datasets: [{ 
                        data: charts.velocidad,
                        label: "Velocidad",
                        borderColor: "#3e95cd",
                        fill: false
                      }, { 
                        data: charts.crucero,
                        label: "Crucero",
                        borderColor: "#8e5ea2",
                        fill: false
                      }, { 
                        data: charts.rpm,
                        label: "Revoluciones",
                        borderColor: "#3cba9f",
                        fill: false
                      }
                    ]
                  },
                  options: {
                    title: {
                      display: false,
                      text: 'World population per region (in millions)'
                    }
                  }
                });
            }, 100);
        });
        
        


        
    }
}
