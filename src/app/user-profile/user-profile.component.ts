import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { NOTES } from '../modal/notesModal';
import { USERS } from '../modal/userModal';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string = "";
  notes: NOTES[] = [];
  connections: any[] = [];
  users!: USERS[];
  isConnected: boolean = false;

  constructor(private service: ServiceService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.username = this.service.userProfile;
    this.getMyNotes();
    this.getAllUsers();
    this.isConnected = false;
    this.service.getUser(this.service.userId).subscribe((data) => {
      this.connections = data.connections;
      for (var i = 0; i < data.connections.length; i++) {
        if (data.connections[i] == this.username) this.isConnected = true;
      }
    });
  }

  getAllUsers() {
    this.service.getUsers().subscribe((data) => {
      this.users = data;
    })
  }

  getMyNotes() {
    this.service.getMyNotes(this.username).subscribe((data) => {
      this.notes = data;
    })
  }

  addConnect() {
    this.connections.push(this.username);
    var obj = {
      "connections": this.connections
    }
    this.service.updateConnection(obj, this.service.userId).subscribe((data) => { });
    this.snack.open("You are now connected with " + this.username, "Ok", {
      duration: 2000
    });
    this.ngOnInit();
  }

  removeConnect() {
    let index: number = this.connections.findIndex(conn => conn === this.username);
    if (index != -1) {
      this.connections.splice(index, 1);
    }
    var obj = {
      "connections": this.connections
    }
    this.service.updateConnection(obj, this.service.userId).subscribe((data) => { });
    this.snack.open('Connection removed.', "Ok", {
      duration: 2000
    });
    this.ngOnInit();
  }

}
