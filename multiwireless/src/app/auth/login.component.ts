import { Router } from '@angular/router';

import { AuthService } from './auth.service';


import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';

import { subscribeOn } from 'rxjs/operator/subscribeOn';
@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
    providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

   
    form:FormGroup;

    constructor(private fb:FormBuilder, 
                 private authService: AuthService, 
                 private router: Router) {

        this.form = this.fb.group({
            email: ['',Validators.required],
            password: ['',Validators.required]
        });
    }
    checkRedirect() {
    	console.log("Check", this.authService.isLoggedIn());
		if(this.authService.isLoggedIn()) {
			const role = this.authService.getRole();
			if(role == "gerente") {
				this.router.navigateByUrl('/dashboard-gerente');
			} else if(role == "analista") {
				this.router.navigateByUrl('/dashboard-analista');
			} else {
				this.router.navigateByUrl('/dashboard-jefe-de-flota');
			}
		}
    }
    ngOnInit() {
		this.checkRedirect();
    }
    login() {
        const val = this.form.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe(
                    (data) => {
                    	this.authService.setSession(data);
                 		this.checkRedirect();
                    },
                    (err) => {
            			alert("Usuario o contraseña incorrecto");
                    }
                );
        }
    }

}