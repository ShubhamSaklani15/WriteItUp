import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });
  submitted:boolean = false;
  invalidUser:boolean = false;
  users:any = [];
  constructor(private snack:MatSnackBar, private router:Router, private formBuilder:FormBuilder, private service: ServiceService) { }

  ngOnInit(): void {
    this.invalidUser=false;
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required,this.validateUsername]],
      password: ['', Validators.required]
    });
    this.service.getUsers().subscribe((data)=>{
      this.users=data;
    })
  }

  get f(): { [key:string]: AbstractControl} {
    return this.loginForm.controls;
  }

  onSubmit() :void {
    this.submitted=true;
    if(this.loginForm.invalid) return;
    //checking valid username and password
    var i=0;
    for(i=0;i<this.users.length;i++) {
      var l1 = JSON.stringify(this.users[i].username).length;
      var l2 = JSON.stringify(this.users[i].password).length;
      var username = JSON.stringify(this.users[i].username).substring(1,l1-1);
      var password = JSON.stringify(this.users[i].password).substring(1,l2-1);
      if(this.loginForm.value.username == username && this.loginForm.value.password == password) {
        this.service.userId=i+1;
        this.service.username=username;
        this.service.password=password;
        this.service.name=this.users[i].name;
        this.service.email=this.users[i].email;
        this.loadSnackBar();
        this.service.isValidUser=true;
        this.router.navigate(['','home']);
      }
    }
    //user not found
    if(i==this.users.length) {
      this.invalidUser=true;
    }
  }

  onReset():void {
    this.submitted=false;
    this.loginForm.reset();
  }

  loadSnackBar() {
    this.snack.open('You have been successfully logged in.',"Ok",{
      duration:3000,
    });
  }

  validateUsername = (control:FormControl) => {
    for(var i=0;i<control.value.length;i++) {
      if(control.value[i]==' ') return  { containSpace:{message:"Username can't have blank spaces."}}
    }
    return null;
  }

}
