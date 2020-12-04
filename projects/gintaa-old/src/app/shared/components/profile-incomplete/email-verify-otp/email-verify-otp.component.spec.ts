import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifyOtpComponent } from './email-verify-otp.component';

describe('EmailVerifyOtpComponent', () => {
  let component: EmailVerifyOtpComponent;
  let fixture: ComponentFixture<EmailVerifyOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailVerifyOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
