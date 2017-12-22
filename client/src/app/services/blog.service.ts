import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class BlogService {

    domain = this.authService.domain;
    options;
    
    constructor(
	private http: HttpClient,
	private authService: AuthService
    ) { }

    createAuthenticationHeaders() {
	this.authService.loadToken();
	this.options = new HttpHeaders()
	    .set('contentType', 'application/json')
	    .set('authorization', this.authService.authToken);
    }

    newBlog(blog): Observable<any> {
	this.createAuthenticationHeaders();
	return this.http.post(this.domain + '/api/blogs', blog, { headers: this.options });
    }

    getAllBlogs(): Observable<any> {
	this.createAuthenticationHeaders();
	return this.http.get(this.domain + '/api/blogs', { headers: this.options });
    }

    getSingleBlog(id): Observable<any> {
	this.createAuthenticationHeaders();
	return this.http.get(this.domain + '/api/blogs/'+id, { headers: this.options });
    }

    editBlog(blog): Observable<any> {
	this.createAuthenticationHeaders();
	return this.http.put(this.domain + '/api/blogs/'+blog._id, blog, { headers: this.options })
    }

}
