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

}
