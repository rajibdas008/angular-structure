import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVerifyOtpComponent } from './mobile-verify-otp.component';

describe('MobileVerifyOtpComponent', () => {
  let component: MobileVerifyOtpComponent;
  let fixture: ComponentFixture<MobileVerifyOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileVerifyOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
