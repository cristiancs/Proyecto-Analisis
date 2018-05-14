import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
	MatButtonModule,
	MatCheckboxModule,
	MatInputModule,
	MatSelectModule,
	MatFormFieldModule,
	MatExpansionModule,
	MatIconModule,
	MatToolbarModule,
	MatDividerModule
} from '@angular/material';


const modules = [
	BrowserAnimationsModule,
	MatButtonModule,
	MatCheckboxModule,
	MatInputModule,
	MatSelectModule,
	MatFormFieldModule,
	MatExpansionModule,
	MatIconModule,
	MatToolbarModule,
	MatDividerModule
];

@NgModule({
	imports: modules,
	exports: modules
})
export class materialModule{}