import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(
	private registerFormBuilder: FormBuilder
    ) {
	this.createForm();
    }

    createForm() {
	this.registerForm = this.registerFormBuilder.group({
	    username: ['', Validators.compose([
		Validators.required,
		Validators.minLength(3),
		Validators.maxLength(15),
		this.validateUsername
	    ])],
	    email: ['', Validators.compose([
		Validators.required,
		Validators.minLength(5),
		Validators.maxLength(30),
		Validators.email
	    ])],
	    password: ['', Validators.compose([
		Validators.required,
		Validators.minLength(8),
		Validators.maxLength(35)
	    ])],
	    confirmPassword: ['', Validators.required]
	}, { validator: this.matchingPasswords('password', 'confirmPassword') });
    }

    validateUsername(controls) {
	const usernameRegExp = new RegExp(/^[a-zA-Z0-9]+$/);
	if (usernameRegExp.test(controls.value)) {
	    return null;
	} else {
	    return { 'validateUsernameError': true }
	}
    }

    matchingPasswords(password, confirmPassword) {
	return (group: FormGroup) => {
	    if (group.controls[password].value === group.controls[confirmPassword].value) {
		return null;
	    } else {
		return { 'matchingPasswordsError': true }
	    }
	}
    }
    
    onRegistrationSubmit() {
	console.log(this.registerForm);
    }
    
    ngOnInit() {
    }

}
