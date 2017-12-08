import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

    domain = 'http://localhost:8080';
    
    constructor(
	private http: HttpClient
    ) { }

    registerUser(user): Observable<any> {
	return this.http
	    .post(this.domain + '/authentication/register', user);
    }

    checkEmailAvailability(email): Observable<any> {
	return this.http
	    .get(this.domain + '/authentication/checkEmail/' + email);
    }

    checkUsernameAvailability(username): Observable<any> {
	return this.http
	    .get(this.domain + '/authentication/checkUsername/' + username);
    }

}
