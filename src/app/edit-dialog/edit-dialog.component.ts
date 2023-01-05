import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  notesForm = new FormGroup({
    title : new FormControl(''),
    body : new FormControl('')
  });
  submitted:boolean = false;

  constructor(private snack:MatSnackBar, private router:Router, private formBuilder:FormBuilder, 
    private dialogRef:MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  recievedData = this.data.message;
  sendata = this.data.message.description;

  ngOnInit(): void {
    this.notesForm = this.formBuilder.group({
      title: [{value:this.recievedData.title, disabled:true}, Validators.required],
      body: [this.recievedData.description, Validators.required]
    });
  }

  get f(): { [key:string]: AbstractControl} {
    return this.notesForm.controls;
  }

  onSubmit():void {
    this.submitted=true;
    if(this.notesForm.invalid) return;
    this.dialogRef.close(this.sendata);
  }

}
