import { Component, OnInit } from '@angular/core';
import { NOTES } from '../modal/notesModal';
import { USERS } from '../modal/userModal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../services/service.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: USERS;
  id!: number;
  notes!: NOTES[];
  allNotes!: NOTES[];
  page: string = "profile";
  editName: boolean = false;
  editPassword: boolean = false;
  myConnects: any[] = [];
  recieved: any[] = [];

  userSent: any[] = [];
  userConnects: any[] = [];

  constructor(private service: ServiceService, private snack: MatSnackBar, private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.service.userId;
    this.service.getUser(this.id).subscribe((data) => {
      this.user = data;
    });
    this.getMyNotes();
    this.getAllNotes();
    this.getConnects();
    this.getRecievedReq();
  }

  getMyNotes() {
    this.service.getMyNotes(this.service.username).subscribe((data) => {
      this.notes = data;
    });
  }

  getAllNotes() {
    this.service.getJsonNote().subscribe((data) => {
      this.allNotes = data;
    })
  }

  getConnects() {
    this.service.getUser(this.service.userId).subscribe((data) => {
      this.myConnects = data.connections;
    });
  }

  getRecievedReq() {
    this.service.getUser(this.service.userId).subscribe((data) => {
      this.recieved = data.recieved;
    });
  }

  savePassword(password: string) {
    if (password.length < 8) {
      this.snack.open('Password must be atleast 8 characters', "Ok", {
        duration: 3000,
      });
    } else {
      var userObj = {
        "password": password
      }
      this.user.password = password;
      this.service.updateuser(userObj, this.id).subscribe((data) => { });
      this.snack.open('Password updated.', "Ok", {
        duration: 2000,
      });
    }
  }

  saveName(name: string) {
    if (name.length == 0) {
      this.snack.open('Name cannot be empty.', "Ok", {
        duration: 3000,
      });
    } else {
      this.user.name = name;
      var userObj = {
        "name": name
      }
      this.service.updateuser(userObj, this.id).subscribe((data) => { });
      this.snack.open('Name updated.', "Ok", {
        duration: 2000,
      });
    }
  }

  //notes

  //dialog box
  openEditDialogBox(note: NOTES) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "400px";
    dialogConfig.width = "1000px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = { message: note };
    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((dataRecieved) => {
      var obj: any = {
        "title": note.title,
        "description": dataRecieved,
        "username": note.username,
        "id": note.id
      }
      if (obj.description != "")
        this.updateNote(obj);
    })
  }
  openDeleteDialogBox(note: NOTES) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "100px";
    dialogConfig.width = "500px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = { message: note };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((dataRecieved) => {
      if (dataRecieved == 'yes') this.deleteNote(note);
    })
  }

  //edit or delete data
  deleteNote(note: NOTES) {
    this.service.deleteJsonNote(note.id).subscribe((data) => { })
    //load Snackbar
    this.snack.open(note.title + ' Deleted.', "Ok", {
      duration: 2000,
    });
    this.ngOnInit();
  }
  updateNote(note: NOTES) {
    this.service.updateJsonNote(note, note.id).subscribe((data) => { });
    //load Snackbar
    this.snack.open(note.title + ' Edited.', "Ok", {
      duration: 2000,
    });
    this.ngOnInit();
  }

  //view notes
  viewNotes(username: any) {
    this.service.userProfile = username;
    this.router.navigate(['/', 'userprofile'])
  }
  //remove connections
  removeConnect(username: any) {

    //remove from my connects
    let index: number = this.myConnects.findIndex(conn => conn === username);
    if (index != -1) {
      this.myConnects.splice(index, 1);
    }
    var obj = {
      "connections": this.myConnects
    }
    this.service.updateConnection(obj, this.service.userId).subscribe((data) => { });

    //remove from user connects
    this.service.getUsers().subscribe((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].username == username) {
          //remove from connects
          var conn: any[] = data[i].connections;
          let index: number = conn.findIndex(conn => conn === this.service.username);
          if (index != -1) {
            conn.splice(index, 1);
          }

          var obj = {
            "connections":conn
          }
          this.service.updateConnection(obj, data[i].id).subscribe((data) => { });
          break;
        }
      }
    });
    this.snack.open('Connection removed.', "Ok", {
      duration: 2000
    });
    this.ngOnInit();
  }

  acceptRequest(username: any) {
    //remove from my recieved and add to connects
    let index: number = this.recieved.findIndex(conn => conn === username);
    if (index != -1) {
      this.recieved.splice(index, 1);
    }

    //add to connects
    this.myConnects.push(username);

    var obj = {
      "recieved": this.recieved,
      "connections": this.myConnects
    }

    this.service.updateConnection(obj, this.service.userId).subscribe((data) => { });

    //remove from user's sent and add to user's connects
    //find user
    this.service.getUsers().subscribe((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].username == username) {
          //remove from sent
          var sent: any[] = data[i].sent;
          let index: number = sent.findIndex(conn => conn === this.service.username);
          if (index != -1) {
            sent.splice(index, 1);
          }

          //add to connects
          var connects: any[] = data[i].connections;
          connects.push(this.service.username);

          var obj = {
            "sent": sent,
            "connections": connects
          }

          this.service.updateConnection(obj, data[i].id).subscribe((data) => { });
          this.snack.open("You are now connected with " + username, "Ok", {
            duration: 2000
          });
          break;
        }
      }
    })

  }

  deleteRequest(username: any) {
    //remove from my recieved and users sent
    //find user and remove from sent
    this.service.getUsers().subscribe((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].username == username) {
          //remove from sent
          var sent: any[] = data[i].sent;
          let index: number = sent.findIndex(conn => conn === this.service.username);
          if (index != -1) {
            sent.splice(index, 1);
          }

          var obj = {
            "sent": sent
          }
          this.service.updateConnection(obj, data[i].id).subscribe((data) => { });
          break;
        }
      }
    });

    //remove from my recieved
    let index:number = this.recieved.findIndex(con => con === username);
    if(index!=-1) this.recieved.splice(index,1);
    var obj = {
      "recieved":this.recieved
    }
    this.service.updateConnection(obj,this.service.userId).subscribe((data)=>{});
    
  }
}
