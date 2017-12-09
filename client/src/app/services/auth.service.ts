import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

    domain = 'http://localhost:8080';
    authToken;
    user;
    
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

    login(user) {
	return this.http
	    .post(this.domain + '/authentication/login', user);
    }

    storeUserData(token, user) {
	localStorage.setItem('token', token);
	localStorage.setItem('user', JSON.stringify(user));

	this.authToken = token;
	this.user = user;
    }

}
