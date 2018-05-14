import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import 'hammerjs';


import { AppComponent } from './app.component';
import { materialModule } from './material.module';

import {DashboardAnalistaComponent} from './dashboard/dashboard-analista.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardAnalistaComponent
  ],
  imports: [
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
