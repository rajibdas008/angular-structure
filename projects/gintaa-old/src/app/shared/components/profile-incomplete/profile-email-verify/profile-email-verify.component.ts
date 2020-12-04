import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProfileIncomplete } from '@gintaa/shared/modals';
import { UserProfileIncompleteService } from '@gintaa/shared';
import { pipe, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { CommonHttpService } from '@gintaa/shared/services/common-http.service';

@Component({
  selector: 'app-profile-email-verify',
  templateUrl: './profile-email-verify.component.html',
  styleUrls: ['./profile-email-verify.component.scss']
})
export class ProfileEmailVerifyComponent implements OnInit {

  @Input() profileObj: ProfileIncomplete = null;  
  profileEmail: string = null;
  serverEmailError: string = null;
  emailOtpTransactionId: string = null;

  constructor(
    public dialogRef: MatDialogRef<ProfileEmailVerifyComponent>,
    private profileIncompleteService: UserProfileIncompleteService,
    private httpService: CommonHttpService
  ) { }

  ngOnInit() {
    this.profileIncompleteService.profileData();
  }

  onSubmit() {
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profileName, null, 4));
    const userEmailObj = {
      'email' : this.profileEmail.trim()
    } 
    this.profileObj.email = this.profileEmail.trim();
    this.profileIncompleteService.updateUserEmail(this.profileObj)
    .pipe(tap(response => {
      this.serverEmailError = null;
      this.emailOtpTransactionId = null;
    }),catchError(error => throwError(error)))
    .subscribe(
        res => {
          this.emailOtpTransactionId = res.payload.verificationTransactionId;
          this.profileObj.fields = this.profileObj.fields.filter(item => item !== this.profileObj.openModalVal);
          if(this.profileObj.fields.length) {
            this.profileObj.openModalVal = this.profileObj.fields[0];
            this.profileObj.emailTransactionId = this.emailOtpTransactionId;
          }  
        },
        error => this.serverEmailError = error.error.message,
        () => console.log('complete')
    )
  }

  closeDialog() {  
    this.dialogRef.close({closeEmailVerifyPopUp: true});
  }

}
