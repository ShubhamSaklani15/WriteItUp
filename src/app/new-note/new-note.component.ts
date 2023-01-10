import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NOTES } from '../modal/notesModal';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit {

  newNote!:NOTES[];
  notesForm = new FormGroup({
    title : new FormControl(''),
    description : new FormControl('')
  });
  submitted:boolean = false;

  constructor(private snack:MatSnackBar, private router:Router, private formBuilder:FormBuilder,
    private http:HttpClient, private service: ServiceService) {
      this.service.getJsonNote().subscribe((data)=>{
        this.newNote=data;
      })
     }

  ngOnInit(): void {
    this.notesForm = this.formBuilder.group({
      title: ['',Validators.required],
      description: ['',Validators.required]
    });
  }

  get f(): { [key:string]: AbstractControl} {
    return this.notesForm.controls;
  }

  onSubmit(title:string):void {
    var flag:boolean=false;
    var Title;
    for(var i=0;i<this.newNote.length;i++) {
      var len = JSON.stringify(this.newNote[i].title).length;
      Title = JSON.stringify(this.newNote[i].title.substring(0,len-1));
      var str:string="";
      for(var k=1;k<len-1;k++) str+=Title[k];
      if(str==title) {
        flag=true;
        this.snack.open('Please enter different title.', "Ok", {
          duration:2000,
        });
      }
    }
    if(flag == false) {
      this.submitted=true;
      if(this.notesForm.invalid) return;
      var obj = {
        "title": title,
        "description":this.notesForm.value.description,
        "username":this.service.username,
        "userId":this.service.userId
      }
      this.service.addJsonNote(obj).subscribe((data)=>{});
      this.loadSnackBar();
    }
  }

  loadSnackBar() {
    this.snack.open('New Note has been successfully added.',"Ok",{
      duration:2000,
    });
  }

  onReset():void {
    this.submitted=false;
    this.notesForm.reset();
  }

}
