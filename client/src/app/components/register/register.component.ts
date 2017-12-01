import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(
	private registerFormBuilder: FormBuilder,
	private authService: AuthService
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
		Validators.maxLength(35),
		this.validatePassword
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

    validatePassword(controls) {
	const passwordRegExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
	if(passwordRegExp.test(controls.value)){
	    return null;
	} else {
	    return { 'validatePasswordError': true }
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
	const user = {
	    email: this.registerForm.get('email').value,
	    username: this.registerForm.get('username').value,
	    password: this.registerForm.get('password').value
	}

	this.authService.registerUser(user)
	    .subscribe(data => {
		console.log("Registration response: ", data);
	    });
    }
    
    ngOnInit() {
    }

}
