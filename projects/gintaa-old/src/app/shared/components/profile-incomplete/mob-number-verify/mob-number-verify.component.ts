import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProfileIncomplete, UserProfileResponse } from '@gintaa/shared/modals';
import { UserProfileIncompleteService } from '@gintaa/shared';
import { pipe, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { CommonHttpService } from '@gintaa/shared/services/common-http.service';
@Component({
  selector: 'app-mob-number-verify',
  templateUrl: './mob-number-verify.component.html',
  styleUrls: ['./mob-number-verify.component.scss']
})
export class MobNumberVerifyComponent implements OnInit {

  @Input() profileObj: ProfileIncomplete = null;
  profileMobile: string = null;
  serverPhoneError: string = null;
  mobileOtpTransactionId:  string = null;

  constructor(
    public dialogRef: MatDialogRef<MobNumberVerifyComponent>,
    private profileIncompleteService: UserProfileIncompleteService,
    private httpService: CommonHttpService) { }

  ngOnInit() {
    this.profileIncompleteService.profileData();
  }

  onSubmit() {
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profileName, null, 4));
    const userPhoneObj = {
      'mobile' : this.profileMobile.trim()
    }  
    this.profileObj.phone = this.profileMobile.trim();  
    this.profileIncompleteService.updateUserPhone(this.profileObj)
    .pipe(tap(response => {
      this.serverPhoneError = null;
      this.mobileOtpTransactionId = null;
    }),catchError(error => throwError(error)))
    .subscribe(
        res => {
          this.mobileOtpTransactionId = res.payload.verificationTransactionId;
          this.profileObj.fields = this.profileObj.fields.filter(item => item !== this.profileObj.openModalVal);
          if(this.profileObj.fields.length)
          this.profileObj.openModalVal = this.profileObj.fields[0];
          this.profileObj.mobileTransactionId = this.mobileOtpTransactionId;      
        },
        error => this.serverPhoneError = error.error.message,
        () => console.log('complete')
    );
  }

  closeDialog() {
    this.dialogRef.close({closePhoneVerifyPopUp: true})
  }

}
