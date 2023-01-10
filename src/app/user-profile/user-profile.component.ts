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
  userId: number = 0;
  notes: NOTES[] = [];
  connections: any[] = []; //my connection
  connection2: any[] = []; //connection of this user
  sent: any[] = []; //my sent req
  users!: USERS[];
  recieved: any[] = []; //user reci req
  isConnected: number = 0; //0-> connect, 1-> request send, 2-> remove, 3->accept
  constructor(private service: ServiceService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.username = this.service.userProfile;
    this.userId = this.service.userProfileId;
    this.getMyNotes();
    this.getAllUsers();
    this.getRecievedReq();
    this.getUserConnections();
    this.isConnected = 0;
    this.service.getUser(this.service.userId).subscribe((data) => {
      this.connections = data.connections;
      this.sent = data.sent;
      for (var i = 0; i < data.connections.length; i++) {
        if (data.connections[i] == this.username) this.isConnected = 2;
      }
      for (var i = 0; i < data.sent.length; i++) {
        if (data.sent[i] == this.username) this.isConnected = 1;
      }
      for (var i = 0; i < data.recieved.length; i++) {
        if (data.recieved[i] == this.username) this.isConnected = 3;
      }
    });    
  }

  getRecievedReq() {
    this.service.getUser(this.userId).subscribe((data) => {
      this.recieved = data.recieved;
    });
  }

  getUserConnections() {
    this.service.getUser(this.userId).subscribe((data) => {
      this.connection2 = data.connections;
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
    this.sent.push(this.username);
    this.recieved.push(this.service.username);
    var obj1 = {
      "sent": this.sent
    }
    var obj2 = {
      "recieved": this.recieved
    }

    this.service.updateConnection(obj1, this.service.userId).subscribe((data) => { });
    this.service.updateConnection(obj2, this.userId).subscribe((data) => { });
    this.isConnected = 1;
    this.snack.open("Request Sent!", "Ok", {
      duration: 2000
    });
    this.ngOnInit();
  }

  removeConnect() {
    if (this.isConnected == 1) //reqest sent, i.e remove from my sent and user's recieved
    {
      //remove from my sent
      let index: number = this.sent.findIndex(sent => sent === this.username);
      if (index != -1) {
        this.sent.splice(index, 1);
      }
      var obj = {
        "sent": this.sent
      }
      this.service.updateConnection(obj, this.service.userId).subscribe((data) => { });

      //remove from user recieved
      index = this.recieved.findIndex(rec => rec === this.service.username);
      if (index != -1) {
        this.recieved.splice(index, 1);
      }
      var obj2 = {
        "recieved": this.recieved
      }
      this.service.updateConnection(obj2, this.userId).subscribe((data) => { });

      this.isConnected=0;
      this.snack.open('Request Cancelled.', "Ok", {
        duration: 2000
      });
      this.ngOnInit();
    }
    else //connected, i.e , remove from my and user's connections
    {
      //remove from my connections
      let index: number = this.connections.findIndex(conn => conn === this.username);
      if (index != -1) {
        this.connections.splice(index, 1);
      }
      var ob = {
        "connections": this.connections
      }
      this.service.updateConnection(ob, this.service.userId).subscribe((data) => { });
      
      //remove from user connections
      index = this.connection2.findIndex(conn => conn === this.service.username);
      if (index != -1) {
        this.connection2.splice(index, 1);
      }
      var ob2 = {
        "connections": this.connection2
      }
      this.service.updateConnection(ob2, this.userId).subscribe((data) => { });

      this.isConnected=0;
      this.snack.open('Connection removed.', "Ok", {
        duration: 2000
      });
      this.ngOnInit();
    }
  }

  
  acceptReq() {
    //remove from my recieved
    this.service.getUser(this.service.userId).subscribe((data)=>{
      var rec = data.recieved;
      let index:number = rec.findIndex(conn => conn === this.username);
      if(index!=-1) rec.splice(index,1);
      //add to my connections
      var conn = data.connections;
      conn.push(this.username);
      var obj = {
        "connections":conn,
        "recieved":rec
      }
      this.service.updateConnection(obj, this.service.userId).subscribe((data) => { });
    });

    //remove from users sent
    this.service.getUser(this.userId).subscribe((data)=>{
      var send = data.sent;
      let index:number = send.findIndex(conn => conn === this.service.username);
      if(index!=-1) send.splice(index,1);
      //add to user conn
      var conn = data.connections;
      conn.push(this.service.username);
      var obj = {
        "connections":conn,
        "sent":send
      }
      this.service.updateConnection(obj, this.userId).subscribe((data) => { });
    });
    this.snack.open("You are now connected with "+this.username, "Ok", {
      duration: 2000
    });
    this.isConnected=2;
    this.ngOnInit();
  }

}
