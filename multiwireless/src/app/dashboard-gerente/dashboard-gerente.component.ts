import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';

import { Chart } from 'chart.js';
import { DashboardService } from './dashboard.service';
import { Vehiculo } from '../models/vehiculo.model';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
@Component({
    selector: 'app-dashboard-gerente',
    templateUrl: './app-dashboard-gerente.component.html',
    styleUrls: ['./app-dashboard-gerente.component.css'],
    providers: [ DashboardService ]
})
export class DashboardGerenteComponent implements OnInit{
    constructor(private dashboardService: DashboardService) {}


    vehiculos: Vehiculo[];
    loading: boolean;
    charts: {};

    ngOnInit() {
        this.loading = true;
        this.charts = {};
        this.dashboardService
            .getGraph()
            .then((data: any) => {
                    this.loading = false;
                    this.charts.ralenti = true;
                    console.log(data);
                    setTimeout(() => {
                        this.charts.ralenti_this_month = new Chart(document.getElementById("ralentiChart"),{
                            type: 'doughnut',
                            data: {
                                datasets: [
                                    {
                                        data: data.ralenti.ralenti_this_month,
                                        backgroundColor: ["rgba(255, 100, 133, 1.000)", "rgba(55, 162, 235, 1.000)"]
                                        label: 'Este Mes' 
                                    }, 
                                ],
                                labels: [
                                    'Ralenti',
                                    'En Desplazamiento',
                                ]
                            },
                            options: {
                                 title: {
                                  display: true,
                                  text: 'Este Mes'
                                }
                            }
                            );

                        this.charts.ralenti_last_month = new Chart(document.getElementById("ralentiChart2"),{
                            type: 'doughnut',
                            data: {
                                datasets: [
                                    {
                                        data: data.ralenti.ralenti_last_month,
                                        backgroundColor: ["rgba(255, 100, 133, 1.000)", "rgba(55, 162, 235, 1.000)"]
                                        label: 'Este Mes' 
                                    }, 
                                ],
                                labels: [
                                    'Ralenti',
                                    'En Desplazamiento',
                                ]
                            },
                            options: {
                                 title: {
                                  display: true,
                                  text: 'Mes Pasado'
                                }
                            }
                            );
                    }, 100) 
                   
            });
    }

   
}
