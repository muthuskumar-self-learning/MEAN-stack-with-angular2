import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    processing = false;
    
    constructor(
	private formBuilder: FormBuilder
    ) {
	this.createForm();
    }

    createForm() {
	this.loginForm = this.formBuilder.group({
	    username: ['', Validators.required],
	    password: ['', Validators.required]
	});
    }

    disableForm() {
	this.loginForm.controls['username'].disable();
	this.loginForm.controls['password'].disable();
    }

    enableForm() {
	this.loginForm.controls['username'].enable();
	this.loginForm.controls['password'].enable();
    }

    onLoginSubmit() {
	this.processing = true;
	this.disableForm();

	const user = {
	    username: this.loginForm.get('username').value,
	    password: this.loginForm.get('password').value
	}

	console.log(user);
    }
    ngOnInit() {
    }

}
