import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileIncomplete } from '@gintaa/shared/modals';
import { LoggerService } from '@gintaa/shared/services/logger.service';


@Component({
  selector: 'app-profile-incomplete',
  templateUrl: './profile-incomplete.component.html',
  styleUrls: ['./profile-incomplete.component.scss']
})

export class ProfileIncompleteComponent implements OnInit {
  profileIncomplete: ProfileIncomplete = new ProfileIncomplete();
  
  constructor(
    public dialogRef: MatDialogRef<ProfileIncompleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.profileIncomplete.openModalVal = this.data.profileIncompleteFields[0];
    this.profileIncomplete.source = this.data.identifier;
    this.profileIncomplete.fields = this.data.profileIncompleteFields;
    if(this.data.identifier === 'chat')
    this.profileIncomplete.chatOwner = this.data.chatOwner;
  }

}
