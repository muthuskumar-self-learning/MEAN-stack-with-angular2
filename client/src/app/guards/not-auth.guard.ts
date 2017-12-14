import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

    constructor(
	private authService: AuthService,
	private router: Router
    ){}

    canActivate(
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): boolean {
	if (this.authService.loggedIn()) {
	    this.router.navigate(['/']);
	    return false;
	} else {
	    return true;
	}
    }
}
