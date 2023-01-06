import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';
  signupForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitted: boolean = false;
  users: any = [];

  constructor(private snack: MatSnackBar, private router: Router, private formBuilder: FormBuilder, private service: ServiceService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, this.validateUsername]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex), this.validateEmail]],
      password: ['', [Validators.required,this.validatePassword]]
    });
    this.service.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) return;
    this.loadSnackBar();
    var obj = {
      "name":this.signupForm.value.name,
      "username":this.signupForm.value.username,
      "email":this.signupForm.value.email,
      "password":this.signupForm.value.password,
      "connections":[]
    }
    this.service.addUser(obj).subscribe((data) => { });
  }

  onReset(): void {
    this.submitted = false;
    this.signupForm.reset();
  }

  loadSnackBar() {
    this.snack.open('Your account has been successfully created', "Ok", {
      duration: 2000,
    });
  }

  validateUsername = (control: FormControl) => {
    //validating invalid username
    for (var i = 0; i < control.value.length; i++) {
      if (control.value[i] == ' ') return {
        containSpace: { message: "Username can't have blank spaces" }
      }
    }
    //validating with existing users
    for (var i = 0; i < this.users.length; i++) {
      var len = JSON.stringify(this.users[i].username).length;
      if (JSON.stringify(this.users[i].username).substring(1, len - 1) == control.value) return {
        existingUser: { message: "Username already exist" }
      }
    }
    return null;
  }

  validateEmail = (control: FormControl) => {
    //validating existing email
    for (var i = 0; i < this.users.length; i++) {
      var len = JSON.stringify(this.users[i].email).length;
      if (JSON.stringify(this.users[i].email).substring(1, len - 1) == control.value) return {
        existingEmail: { message: "Email already exist" }
      }
    }
    return null;
  }

  validatePassword = (control: FormControl) => {
    if (control.value.length < 8) return {
      invalid: { message: "Password must be atleast 8 characters" }
    }
    return null;
  }

}
