import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

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
	private authService: AuthService,
	private blogService: BlogService
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
	this.processing = true;
	this.disableBlogForm();

	const blog = {
	    title: this.blogForm.get('title').value,
	    body: this.blogForm.get('body').value,
	    createdBy: this.username
	}

	this.blogService.newBlog(blog)
	    .subscribe(data => {
		if (!data.success) {
		    this.processing = false;
		    this.enableBlogForm();
		    this.messageClass = 'alert alert-danger';
		    this.message = data.message;
		} else {
		    this.messageClass = 'alert alert-success';
		    this.message = data.message;

		    setTimeout(() => {
			this.newPost = false;
			this.processing = false;
			this.message = undefined;
			this.messageClass= undefined;
			this.blogForm.reset();
			this.enableBlogForm();
		    }, 2000);
		}
	    });
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
