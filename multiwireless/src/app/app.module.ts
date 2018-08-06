import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import 'hammerjs';


import { AppComponent } from './app.component';
import { materialModule } from './material.module';

import {DashboardAnalistaComponent} from './dashboard-analista/dashboard-analista.component';
import {DashboardJefeDeFlotaComponent} from './dashboard-jefe-de-flota/dashboard-jefe-de-flota.component';

const appRoutes: Routes = [
  { path: 'dashboard-analista', component: DashboardAnalistaComponent },
  { path: 'dashboard-jefe-de-flota',      component: DashboardJefeDeFlotaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardAnalistaComponent,
    DashboardJefeDeFlotaComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }, // <-- debugging purposes only
    ),
    BrowserModule,
    materialModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
