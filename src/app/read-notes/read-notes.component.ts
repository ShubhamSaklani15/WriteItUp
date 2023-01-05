import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-notes',
  templateUrl: './read-notes.component.html',
  styleUrls: ['./read-notes.component.css']
})
export class ReadNotesComponent implements OnInit {

  @Input() text!: string;
  @Input() wordLimit!: number;
  showMore!: boolean
  constructor() {
    this.showMore = false;
  }

  ngOnInit(): void {
  }

}
