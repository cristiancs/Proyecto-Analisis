import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import { Chart } from 'chart.js';
import { DashboardService } from './dashboard.service';
import { Vehiculo } from '../models/vehiculo.model';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
@Component({
    selector: 'app-dashboard-jefe-de-flota',
    templateUrl: './app-dashboard-jefe-de-flota.component.html',
    styleUrls: ['./app-dashboard-jefe-de-flota.component.css'],
    providers: [ DashboardService ]
})
export class DashboardJefeDeFlotaComponent implements OnInit{
    constructor(private dashboardService: DashboardService) {}
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
        .then((charts: any) => {
            this.charts[id] = true;
            setTimeout(() => {
                this.charts[id] = new Chart(document.getElementById("chartContainer-"+id), {
                  type: 'line',
                  data: {
                    labels: charts.horas,
                    datasets: [{ 
                        data: charts.velocidad,
                        label: "Velocidad",
                        yAxisID: 'A',
                        borderColor: "rgba(62, 149, 205, 0.600)",
                        backgroundColor: "rgba(62, 149, 205, 0.500)",
                        fill: true,
                      }, { 
                        data: charts.crucero,
                        label: "Crucero",
                        borderColor: "#8e5ea2",
                        backgroundColor: "#8e5ea2",
                        yAxisID: 'B',
                        fill: false
                      }, { 
                        data: charts.rpm,
                        label: "Revoluciones",
                        yAxisID: 'C',
                        borderColor: "rgba(60, 186, 159, 0.600)",
                        backgroundColor: "rgba(60, 186, 159, 0.500)",
                        fill: true
                      }
                    ]
                  },
                  options: {
                    scales: {
                        yAxes: [
                            {
                                id: 'A',
                                type: 'linear',
                                position: 'left',
                            }, 
                            {
                                id: 'B',
                                type: 'linear',
                                position: 'left',
                                ticks: {
                                    max: 1,
                                    min: 0,
                                    stepSize: 1
                                }
                                
                            },
                            {
                                id: 'C',
                                type: 'linear',
                                position: 'right',
                            }
                        ],
                    },
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
