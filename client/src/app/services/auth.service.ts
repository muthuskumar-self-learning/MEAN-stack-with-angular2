import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

    domain = 'http://localhost:8080';
    authToken;
    user;
    options;
    
    constructor(
	private http: HttpClient
    ) { }

    createAuthenticationHeaders() {
	this.loadToken();
	this.options = new HttpHeaders()
	    .set('contentType', 'application/json')
	    .set('authorization', this.authToken);
    }
    
    loadToken() {
	this.authToken = localStorage.getItem('token');
    }

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

    login(user): Observable<any> {
	return this.http
	    .post(this.domain + '/authentication/login', user);
    }

    logout() {
	this.authToken = null;
	this.user = null;
	localStorage.clear();
    }

    loggedIn() {
	return tokenNotExpired();
    }
    
    getProfile(): Observable<any> {
	this.createAuthenticationHeaders();
	return this.http
	    .get(this.domain + '/authentication/profile', { headers: this.options });
    }
    
    storeUserData(token, user) {
	localStorage.setItem('token', token);
	localStorage.setItem('user', JSON.stringify(user));

	this.authToken = token;
	this.user = user;
    }

}
