import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.service.userId=0;
    this.service.isValidUser=false;
    this.service.username="";
    this.service.email="";
    this.service.password="";
    this.service.name="";
    this.router.navigate(['/','login']);
  }
}
