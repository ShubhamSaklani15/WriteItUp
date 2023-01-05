import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConnectsComponent } from './my-connects.component';

describe('MyConnectsComponent', () => {
  let component: MyConnectsComponent;
  let fixture: ComponentFixture<MyConnectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyConnectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyConnectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
