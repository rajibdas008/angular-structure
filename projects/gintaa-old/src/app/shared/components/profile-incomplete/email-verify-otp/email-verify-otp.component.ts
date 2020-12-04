import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProfileIncomplete } from '@gintaa/shared/modals';
import { UserProfileIncompleteService } from '@gintaa/shared';
import { throwError, timer } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-email-verify-otp',
  templateUrl: './email-verify-otp.component.html',
  styleUrls: ['./email-verify-otp.component.scss']
})
export class EmailVerifyOtpComponent implements OnInit {

  @Input() profileObj: ProfileIncomplete = null;
  @ViewChild('ngOtpInputEmail', {static: false}) ngOtpInputEmail: any;

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px'
    }
  };
  serverEmailError: string = null;
  currentEmailOtp: string = null;
  emailOtpTransactionId: any;
  countDown;
  counter = 60;
  tick = 1000;
  showTimer: boolean;

  constructor(
    public dialogRef: MatDialogRef<EmailVerifyOtpComponent>,
    private profileIncompleteService: UserProfileIncompleteService
    ) { }

  ngOnInit() {
    this.setTimer();
  }

  closeDialog() {
    this.dialogRef.close({closeEmailVerifyPopUp: true});
  }

  onOtpChange(otp: any){
    //this.isOtpInvalid = false;
    this.currentEmailOtp = otp;
  }

  onPasteEmailOtp(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    this.ngOtpInputEmail.setValue(pastedText);
  }

  verifyEmailOtp() {
    console.log('value::::::', this.currentEmailOtp);
    this.serverEmailError = null;
    if(!this.currentEmailOtp) {
      this.serverEmailError = 'Please enter a valid otp';
      return false;
    }
    this.profileIncompleteService.verifyOtpWithEmail(this.profileObj.emailTransactionId, this.currentEmailOtp)
    .subscribe(
      (resp: any) => {
        this.profileObj.fields = this.profileObj.fields.filter(item => item !== this.profileObj.openModalVal);
        if(this.profileObj.fields.length) {
          this.profileObj.openModalVal = this.profileObj.fields[0];
        } else {
          this.closeDialog();
          if(this.profileObj.source === 'chat') {
            this.profileIncompleteService.navigateTo(this.profileObj.source, this.profileObj.chatOwner);
          } else {
            this.profileIncompleteService.navigateTo(this.profileObj.source);
          }
        }
        //this.isEmailOtpInvalid = false;
        //this.setProfile();
        //this.authService.updateUserContactInfo(this.profileForm.get('phoneNo').value);
      },
      (error: any) => {
        //this.isEmailOtpInvalid = true;
        this.serverEmailError = error.error.message;
      },
      () => console.log('email verify otp complete')
    );
  }

  resendOtpForEmail() {
    this.profileIncompleteService.updateUserEmail(this.profileObj)
    .pipe(tap(response => {
      this.serverEmailError = null;
      this.emailOtpTransactionId = null;
    }),catchError(error => throwError(error)))
    .subscribe(
      res => {
        this.resetOtpEmail();
        this.profileObj.emailTransactionId = res.payload.verificationTransactionId;
        this.setTimer();       
      },
      error => {
        this.serverEmailError = error.error.message;
        this.counter = 60;
      },
      () => console.log('complete')
    )
  }

  setTimer() {
    this.showTimer = true;
    this.countDown = timer(0, this.tick)
      .pipe(
        take(this.counter),
        map(() => --this.counter)
      );
  }

  resetOtpEmail() {
    this.ngOtpInputEmail.setValue('');
    //this.isEmailOtpInvalid = false;
    this.serverEmailError = null;
    this.showTimer = false;
    this.counter = 60;
  }

}
