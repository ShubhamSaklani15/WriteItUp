import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }
  note=this.data.message;
  ngOnInit(): void {
  }
  sendData(valueToSend:string) {
    this.dialogRef.close(valueToSend);
  }
}
