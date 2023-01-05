import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
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

  constructor(private  service:ServiceService, private snack:MatSnackBar, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getJsonNotes();
  }
  getJsonNotes() {
    this.service.getJsonNote().subscribe((data)=>{
      this.notes=data;
    })
  }

  //verify user before editing or deleting notes
  verifyEditUser(note:NOTES) {
    if(this.service.username!=note.username) {
      this.snack.open('You cannot edit this note.',"Ok", {
        duration:2000,
      });
    }else {
      this.openEditDialogBox(note);
    }
  }
  verifyDeleteUser(note:NOTES) {
    if(this.service.username!=note.username) {
      this.snack.open('You cannot delete this note.',"Ok", {
        duration:2000,
      });
    }else {
      this.openDeleteDialogBox(note);
    }
  }

  //dialog box
  openEditDialogBox(note:NOTES) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height="400px";
    dialogConfig.width="1000px";
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=false;
    dialogConfig.data = {message:note};
    const dialogRef = this.dialog.open(EditDialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe((dataRecieved)=> {
      var obj:any = {
        "title":note.title,
        "description":dataRecieved,
        "username":note.username
      }
      this.updateNote(obj);
    })
  }
  openDeleteDialogBox(note:NOTES) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height="100px";
    dialogConfig.width="500px";
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=false;
    dialogConfig.data = {message:note};
    const dialogRef = this.dialog.open(DeleteDialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe((dataRecieved)=> {
      if(dataRecieved=='yes') this.deleteNote(note);
    })
  }

  //edit or delete data
  deleteNote(note:NOTES) {
    var id:number = this.findId(note);
    this.service.deleteJsonNote(id).subscribe((data)=>{})
    //load Snackbar
    this.snack.open(note.title+' Deleted.',"Ok",{
      duration:2000,
    });
    this.ngOnInit();
  }
  updateNote(note:NOTES) {
    var id:number = this.findId(note);
    this.service.updateJsonNote(note,id).subscribe((data)=>{});
     //load Snackbar
     this.snack.open(note.title+' Edited.',"Ok",{
      duration:2000,
    });
    this.ngOnInit();
  }

  findId(note:NOTES):number {
    var id:number=0;
    for(var i=0;i<=this.notes.length;i++) {
      id++;
      if(note.title==this.notes[i].title) break;
    }
    return id;
  }
}
