import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { NOTES } from '../modal/notesModal';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username:string="";
  notes:NOTES[]=[];
  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.username=this.service.userProfile;
    this.getMyNotes();
  }

  getMyNotes() {
    this.service.getMyNotes(this.username).subscribe((data)=>{
      this.notes=data;
    })
  }

}
