import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

    message;
    messageClass;
    processing = false;
    blog = {
	_id: 0,
	title: null,
	body: null
    }
    
    constructor(
	private location: Location
    ) { }

    updateBlogSubmit() {

    }

    goBack() {
	this.location.back();
    }
    
    ngOnInit() {
    }

}
