import { Component, Input, OnInit, ViewChild } from '@angular/core';import { MatDialogRef } from '@angular/material';
import { ProfileIncomplete } from '@gintaa/shared/modals';
import { UserProfileIncompleteService } from '@gintaa/shared';
import { throwError, timer } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
3


@Component({
  selector: 'app-mobile-verify-otp',
  templateUrl: './mobile-verify-otp.component.html',
  styleUrls: ['./mobile-verify-otp.component.scss']
})
export class MobileVerifyOtpComponent implements OnInit {

  @Input() profileObj: ProfileIncomplete = null;
  @ViewChild('ngOtpInputPhone', {static: false}) ngOtpInputPhone: any;

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
  serverPhoneError: string = null;
  currentPhoneOtp: string = null;
  phoneOtpTransactionId: any;
  countDown;
  counter = 60;
  tick = 1000;
  showTimer: boolean;

  constructor(
    public dialogRef: MatDialogRef<MobileVerifyOtpComponent>,
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
    this.currentPhoneOtp = otp;
  }

  onPastePhoneOtp(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    this.ngOtpInputPhone.setValue(pastedText);
  }

  verifyPhoneOtp() {
    console.log('value::::::', this.currentPhoneOtp);
    this.serverPhoneError = null;
    if(!this.currentPhoneOtp) {
      this.serverPhoneError = 'Please enter a valid otp';
      return false;
    }
    this.profileIncompleteService.verifyOtpWithPhone(this.profileObj.mobileTransactionId, this.currentPhoneOtp)
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
      },
      (error: any) => {
        this.serverPhoneError = error.error.message;
      },
      () => console.log('phone verify otp complete')
    );
  }

  resendOtpForPhone() {
    this.profileIncompleteService.updateUserPhone(this.profileObj)
    .pipe(tap(response => {
      this.serverPhoneError = null;
    }),catchError(error => throwError(error)))
    .subscribe(
      res => {
        this.resetOtpPhone();
        this.profileObj.mobileTransactionId = res.payload.verificationTransactionId;
        this.setTimer();       
      },
      error => {
        this.serverPhoneError = error.error.message;
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

  resetOtpPhone() {
    this.ngOtpInputPhone.setValue('');
    this.serverPhoneError = null;
    this.showTimer = false;
    this.counter = 60;
  }

}
