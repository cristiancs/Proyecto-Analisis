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
                    console.log(data.consumo.datos);
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

                        this.charts.consumo = new Chart(document.getElementById("consumoChart"),{
                            type: 'bar',
                            data: {
                                labels: data.consumo.ejes,

                                datasets: [
                                    {
                                        label: "Consumo",
                                        data: data.consumo.datos,
                                        "backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],"borderColor":["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"],
                                        "borderWidth":1
                                    }, 
                                ]
                            },
                           
                        );











                    }, 100) 
                   
            });
    }

   
}
