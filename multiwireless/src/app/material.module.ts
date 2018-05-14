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
	MatDividerModule,
	MatProgressSpinnerModule
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
	MatDividerModule,
	MatProgressSpinnerModule
];

@NgModule({
	imports: modules,
	exports: modules
})
export class materialModule{}