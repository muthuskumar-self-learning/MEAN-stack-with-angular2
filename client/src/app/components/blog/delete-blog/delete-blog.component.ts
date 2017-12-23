import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
})
export class DeleteBlogComponent implements OnInit {

    message;
    messageClass;
    processing = false;
    foundBlog = false;
    blog = {
	title: null,
	body: null,
	createdOn: null,
	createdBy: null
    };
    blogId;

    constructor(
	private activatedRoute: ActivatedRoute,
	private blogService: BlogService,
	private router: Router
    ) { }

    deleteBlog() {
	this.blogService.deleteBlog(this.blogId.id)
	    .subscribe(data => {
		if (!data.success) {
		    this.messageClass = 'alert alert-danger';
		    this.message = data.message;
		} else {
		    this.messageClass = 'alert alert-success';
		    this.message = data.message;

		    setTimeout(() => {
			this.router.navigate(['/blog']);
		    }, 2000);
		}
	    });
    }

    ngOnInit() {
	this.blogId = this.activatedRoute.snapshot.params;

	this.blogService.getSingleBlog(this.blogId.id)
	    .subscribe(data => {
		if (!data.success) {
		    this.messageClass = 'alert alert-danger';
		    this.message = data.message;
		} else {
		    this.blog = data.blog;
		    this.foundBlog = true;
		}
	    });	
    }

}
