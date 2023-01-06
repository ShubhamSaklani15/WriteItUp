import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ServiceService } from '../services/service.service';
import { NOTES } from '../modal/notesModal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message!:string;
  index!:number;
  notes!:NOTES[];
  user:string=this.service.username;

  constructor(private  service:ServiceService, private snack:MatSnackBar, private dialog:MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getJsonNotes();
  }
  getJsonNotes() {
    this.service.getJsonNote().subscribe((data)=>{
      this.notes=data;
    })
  }
  
  openProfile(username:string) {
    this.service.userProfile=username;
    if(username == this.service.username) this.router.navigate(['/','profile']);
    else this.router.navigate(['/','userprofile']);
  }
}
