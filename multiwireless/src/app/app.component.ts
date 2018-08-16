import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AuthService ]
})
export class AppComponent implements OnInit {
	constructor( private authService: AuthService, 
                 private router: Router) {
	}
  	logout() {
  		console.log("logout");
 		this.authService.logout();
 		this.router.navigateByUrl('/');
 	}
 	ngOnInit() {
 		if(!this.authService.isLoggedIn()) {
			this.router.navigateByUrl('/');
		}
 	}
 	
}


