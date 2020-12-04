import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProfileIncomplete, UserProfileResponse } from '@gintaa/shared/modals';
import { UserProfileIncompleteService } from '@gintaa/shared';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-name-verify',
  templateUrl: './profile-name-verify.component.html',
  styleUrls: ['./profile-name-verify.component.scss']
})
export class ProfileNameVerifyComponent implements OnInit {

  @Input() profileObj: ProfileIncomplete = null;
  profileName: string = null;
  model: any = {};
  serverNameError: string = null;
  constructor(
    public dialogRef: MatDialogRef<ProfileNameVerifyComponent>,
    private profileIncompleteService: UserProfileIncompleteService
  ) { }

  ngOnInit() { }

  onSubmit() {
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profileName, null, 4));
    const userObj = {
      'name' : this.profileName.trim()
    }    
    this.profileIncompleteService.updateUserProfile(userObj, this.profileObj)
    .pipe(
      tap((result: UserProfileResponse) => {
        this.serverNameError = null;
          if(result) {
              this.profileObj.fields = this.profileObj.fields.filter(item => item !== this.profileObj.openModalVal);
              if(this.profileObj.fields.length) {
                  this.profileObj.openModalVal = this.profileObj.fields[0];  
                  //this.openProfileModal(isOpenModal, this.profileObj.source, this.profileObj.fields);
              } else {
                  this.closeDialog();
                  if(this.profileObj.source === 'chat') {
                    this.profileIncompleteService.navigateTo(this.profileObj.source, this.profileObj.chatOwner);
                  } else {
                    this.profileIncompleteService.navigateTo(this.profileObj.source);
                  }
              }
          }
      }),
      catchError(error => throwError(error))
  ).subscribe(
      (res) => console.log(res),
      (error: any) => this.serverNameError = error.error.message,
      () => console.log('complete')
  );
  }

  closeDialog() {
    this.dialogRef.close({closeEmailVerifyPopUp: true});
  }

}
