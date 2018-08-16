import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import 'hammerjs';


import { AppComponent } from './app.component';
import { materialModule } from './material.module';

import {DashboardAnalistaComponent} from './dashboard-analista/dashboard-analista.component';
import {DashboardJefeDeFlotaComponent} from './dashboard-jefe-de-flota/dashboard-jefe-de-flota.component';
import {DashboardGerenteComponent} from './dashboard-gerente/dashboard-gerente.component';
import {LoginComponent} from './auth/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';

const appRoutes: Routes = [
  { path: 'dashboard-analista', component: DashboardAnalistaComponent },
  { path: 'dashboard-jefe-de-flota',      component: DashboardJefeDeFlotaComponent },
  { path: 'dashboard-gerente',      component: DashboardGerenteComponent },
  { path: '',      component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardAnalistaComponent,
    DashboardJefeDeFlotaComponent,
    DashboardGerenteComponent,
    LoginComponent
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
    MatGridListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
