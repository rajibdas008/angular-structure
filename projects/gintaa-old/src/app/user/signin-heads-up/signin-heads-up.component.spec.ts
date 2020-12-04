import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninHeadsUpComponent } from './signin-heads-up.component';

describe('SigninHeadsUpComponent', () => {
  let component: SigninHeadsUpComponent;
  let fixture: ComponentFixture<SigninHeadsUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninHeadsUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninHeadsUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
