import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadNotesComponent } from './read-notes.component';

describe('ReadNotesComponent', () => {
  let component: ReadNotesComponent;
  let fixture: ComponentFixture<ReadNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
