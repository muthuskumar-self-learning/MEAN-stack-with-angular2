import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    messageClass;
    message;
    newPost = false;
    loadingBlogs = false;
    blogForm;
    processing = false;
    username;
    
    constructor(
	private blogFormBuilder: FormBuilder,
	private authService: AuthService
    ) {
	this.createNewBlogForm();
    }

    createNewBlogForm() {
	this.blogForm = this.blogFormBuilder.group({
	    title: ['', Validators.compose([
		Validators.required,
		Validators.minLength(5),
		Validators.maxLength(50)
	    ])],
	    body: ['', Validators.compose([
		Validators.required,
		Validators.minLength(5),
		Validators.maxLength(2000)
	    ])]
	});
    }

    disableBlogForm() {
	this.blogForm.get('title').disable();
	this.blogForm.get('body').disable();
    }

    enableBlogForm() {
	this.blogForm.get('title').enable();
	this.blogForm.get('body').enable();
    }
    
    newBlogForm() {
	this.newPost = true;
    }

    reloadBlogs() {
	this.loadingBlogs = true;

	setTimeout(() => {
	    this.loadingBlogs = false;
	}, 4000)
    }

    draftComment() {

    }

    onBlogFormSubmit() {
	console.log('Blog Form Submitted');
	this.newPost = false;
	this.processing = true;
	this.disableBlogForm();

	const blog = {
	    title: this.blogForm.get('title').value,
	    body: this.blogForm.get('body').value,
	    createdBy: this.username
	}

	console.log(blog);
    }

    cancelNewBlog() {
	window.location.reload();
    }
    
    ngOnInit() {
	this.authService.getProfile()
	    .subscribe(profile => {
		this.username = profile.user.username
	    });
    }

}
