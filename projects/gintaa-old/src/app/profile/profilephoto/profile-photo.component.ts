import { isPlatformBrowser } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import { ImageComponent } from '@gintaa/shared/components/image/image.component';
import { CommonHttpService } from '@gintaa/shared';
import { UserProfileResponse } from '@gintaa/shared/modals';


@Component({
  selector: 'app-profilephoto',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss']
})
export class ProfilePhotoComponent implements OnInit {
  noProfileImageSrc = '/assets/images/profile-1.png';
  @ViewChild('form', { static: false }) form;
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  // fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadComplete: boolean;
  @Input() profileImageUrl: string;
  @Input() profileName: string;
  @Input() userInfo: UserProfileResponse;
  imageError: string = '';
  constructor(
    private httpService: CommonHttpService,
    private authService: AuthService,
    public matDialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (!this.profileImageUrl) {
      this.profileImageUrl = '/assets/images/profile-1.png';
    }
    if(isPlatformBrowser(this.platformId)) {
      const profileUrl = this.authService.getProfileUrl();
      if (profileUrl !== 'undefined' && profileUrl) {
        this.uploadComplete = true;
      } else {
        this.uploadComplete = false;
      }
    }
  }

  // fileProgress(fileInput: any) {
  //   this.fileData = fileInput.target.files[0] as File;
  //   if (!this.isValidateImage()) {
  //     this.form.nativeElement.reset();
  //     this.toastr.error('Please upload one valid image');
  //   }
  // }
  //
  // isValidateImage() {
  //   const mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return false;
  //   }
  //   return true;
  // }

  onSubmit() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = ($event) => {
      var mimeType = fileUpload.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.imageError = "Invalid image!";
        return;
      }
      this.imageError = '';
      this.openModal(fileUpload.files, $event);
    };
    fileUpload.click();
  }

  openModal(files: any, $event: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'image-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '800px';
    dialogConfig.data = { files, event: $event };

    const modalDialog = this.matDialog.open(ImageComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(results => {
      //console.log(`Dialog closed result: ${JSON.stringify(results)}`);
      this.fileUpload.nativeElement.value = '';
      if (results.files) {
        results.files.forEach( file => {
          console.log(`File: ${file}`);
          this.uploadProfilePic(file);
        });
      }
    });
  }

  private uploadProfilePic(file: any) {
    const formData = new FormData();
    formData.append('file', file);

    this.httpService.profileImg(formData)
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          const userProfile: UserProfileResponse = events.body.payload as UserProfileResponse;
          if (userProfile.images) {
            this.uploadComplete = true;
            this.profileImageUrl = userProfile.images[userProfile.images.length-1].url;
            this.authService.setProfileImage(this.profileImageUrl);
          } else {
            this.uploadComplete = false;
            this.profileImageUrl = this.noProfileImageSrc;
          }
          this.form.nativeElement.reset();
        }
      });
  }

}
