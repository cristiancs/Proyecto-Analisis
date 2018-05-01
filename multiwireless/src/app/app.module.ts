import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';


import { AppComponent } from './app.component';
import { materialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    materialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
