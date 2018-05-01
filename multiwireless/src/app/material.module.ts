import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';


const modules = [
	BrowserAnimationsModule,
	MatButtonModule,
	MatCheckboxModule
];

@NgModule({
	imports: modules,
	exports: modules
})
export class materialModule{}