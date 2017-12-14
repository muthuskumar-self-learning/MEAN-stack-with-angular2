import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    redirectUrl;
    
    constructor(
	private authService: AuthService,
	private router: Router
    ){}
    

    canActivate(
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): boolean {
	if (this.authService.loggedIn())
	    return true;
	else {
	    this.redirectUrl = state.url;
	    this.router.navigate(['/login']);
	    return false;
	}
    }
    
}
