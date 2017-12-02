import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    domain = 'http://localhost:8080';
    
    constructor(
	private http: HttpClient
    ) { }

    registerUser(user) {
	return this.http
	    .post(this.domain + '/authentication/register', user);
    }

    checkEmailAvailability(email) {
	return this.http
	    .get(this.domain + '/authentication/checkEmail/' + email);
    }

    checkUsernameAvailability(username) {
	return this.http
	    .get(this.domain + '/authentication/checkUsername/' + username);
    }

}
