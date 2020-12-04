import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfileLocationComponent } from './add-profile-location.component';

describe('AddProfileLocationComponent', () => {
  let component: AddProfileLocationComponent;
  let fixture: ComponentFixture<AddProfileLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfileLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfileLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
