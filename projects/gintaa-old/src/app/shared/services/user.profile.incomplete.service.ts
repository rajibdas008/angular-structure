import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { DealComponent } from '@gintaa/deals/deal/deal.component';
import { NotificationVerification, ProfileIncomplete, Response, UserProfileResponse, UserProfileUpdateRequest } from '@gintaa/shared/modals';
import { CommonHttpService } from '@gintaa/shared/services/common-http.service';
import { Observable, of, pipe, Subject, throwError } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { ProfileIncompleteComponent } from '../components/profile-incomplete/profile-incomplete.component';
import { ChatService } from './chat.service';

@Injectable({
    providedIn: 'root'
})

export class UserProfileIncompleteService {

    private updateProfileData: Subject<any> = new Subject<any>();
    updateProfileData$: Observable<any> = this.updateProfileData.asObservable();

    constructor(
        public matDialog: MatDialog,
        private afAuth: AngularFireAuth,
        private httpService: CommonHttpService,
        private chatService: ChatService,
        private router: Router
    ) { }

    isLoggedIn() {
        return this.afAuth.authState.pipe(first())
     }
     
     checkLoggedIn(identifier?: string) {
       this.isLoggedIn().pipe(
         tap(user => {
           if (user) {
             // do something
             console.log('Inside If block', user);
             this.checkUserProfile(identifier)
           } else {
             // do something else
             console.log('Inside Else block');
             this.router.navigate(['/login'])
           }
         })
       ).subscribe()
     }
    
     checkUserProfile(identifier?: string, isChatOwner?: boolean) {
      this.httpService.getProfile()
      .pipe(        
        map((res: Response) => res.payload || null),
        tap((result: UserProfileResponse) => {
          if(result) {
            const isProfileComplete: boolean = result.userVerified;
            if(isProfileComplete) {
              this.navigateTo(identifier, isChatOwner);
            } else {
              console.log('isProfileComplete:::::', isProfileComplete);
              const phone: string = result.mobile;
              const mobileVerified: boolean = result.mobileVerified;
              const email: string = result.email;
              const emailVerified: boolean = result.emailVerified;
              const name: string = result.name || result.displayName;
              this.openProfileIncompleteModal(mobileVerified, emailVerified, name, identifier, isChatOwner);
              console.log('phone::', phone);
              console.log('email::', email);
              console.log('name::', name);
    
            }
          }      
        }),
        catchError(error => of(`Error in get profile: ${error}`))
      ).subscribe(console.log)
     }

     navigateTo(identifier: string, chatOwner?: boolean) {
         switch (identifier) {
             case 'offer':
                 this.router.navigate(['/add-new-offer'])
                 break;
            case 'chat':
                 //this.setUserChat();
                 this.chatService.chatClickedSub.next(chatOwner);
                 break;
            case 'deal':
                //this.setUserChat();
                this.openDealModal();
                break;
             default:
                 break;
         }
     }
    
     openProfileIncompleteModal(isMobile: boolean, isEmail: boolean, name: string, identifier: string, chatOwner?: boolean) {
        //let isOpenModal: string = null;
        let profileIncompleteFields: string[] = [];
        if(!name) {
          //isOpenModal = 'profileName'; 
          profileIncompleteFields.push('profileName');
        } 
        if(!isMobile) {
          //isOpenModal = 'profileMobile';
          profileIncompleteFields.push('profileMobile', 'profileMobileVerify');
        } 
        if(!isEmail) {
          //isOpenModal = 'profileEmail';
          profileIncompleteFields.push('profileEmail', 'profileEmailVerify');
        }
        console.log('profile incomplete array:::', profileIncompleteFields);
        if(profileIncompleteFields.length) {
          this.openProfileModal(identifier, profileIncompleteFields, chatOwner);
        }
     }
      
      openProfileModal(identifier?: string, profileIncompleteFields?: string[], chatOwner?: boolean) {
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = `profile-incomplete-component-${identifier}`;
        dialogConfig.position = {
          top: '50px',
          // right: '0px'
        };
        //dialogConfig.backdropClass = 'image-dialog-class';
        dialogConfig.height = 'auto';
        dialogConfig.width = 'auto';
        dialogConfig.data = identifier === 'chat' ? { identifier, profileIncompleteFields, chatOwner } : { identifier, profileIncompleteFields };
        const modalDialog = this.matDialog.open(ProfileIncompleteComponent, dialogConfig);
        modalDialog.afterClosed().subscribe(results => {
          console.log(`Chat Dialog closed result: ${JSON.stringify(results)}`);
        });
      }

    updateUserProfile(userObj: {}, profileObj: ProfileIncomplete): Observable<UserProfileResponse> {
        const userProfileUpdateReq = new UserProfileUpdateRequest();
        console.log('going to update:::', );
        const userObjKey = Object.keys(userObj).length ? Object.keys(userObj)[0] : null;
        console.log('going to update keys:::', userObjKey);
        if(userObjKey) {
            userProfileUpdateReq[userObjKey] = userObj[userObjKey]
        }
        return this.httpService.editProfile(userProfileUpdateReq).pipe(
            map((response: Response) => response.payload ? response.payload : null)
        );        
    }

    updateUserEmail(profileObj: ProfileIncomplete) {
        const notification: NotificationVerification = new NotificationVerification();
        notification.verificationIdentifierType = 'email';
        notification.identifier =  profileObj.email;
        return this.httpService.sendNotificationEmail(notification);        
    }

    updateUserPhone(profileObj: ProfileIncomplete) {
        const notification: NotificationVerification = new NotificationVerification();
        notification.verificationIdentifierType = 'mobile';
        notification.identifier =  profileObj.phone;
        return this.httpService.sendNotificationMobile(notification); 
        //notification.identifier = this.profileForm.controls.phoneNo.value;
    }

    verifyOtpWithEmail(verificationTransactionId: string, verifyOtp: string) {
      const reqBody = {
        verificationTransactionId, 
        verifyOtp
      };
      return this.httpService.verifyEmail(reqBody);        
    }

    verifyOtpWithPhone(verificationTransactionId: string, verifyOtp: string) {
      const reqBody = {
        verificationTransactionId, 
        verifyOtp
      };
      return this.httpService.verifyMobile(reqBody);      
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side errors
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        //window.alert(errorMessage);
        return throwError(errorMessage);
      }
      openDealModal() {
        // check if user logged in, otherwise send them to loin
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = 'deal-component';
        dialogConfig.position = {
          top: '0px',
          right: '0px',
        };
        // dialogConfig.backdropClass = 'image-dialog-class';
        dialogConfig.height = 'auto';
        dialogConfig.width = '1170px';
        dialogConfig.data = {
            sourcePage: 'VIEW_OFFER',
            status: 'INITIATE_DEAL'
        };
    
        const modalDialog = this.matDialog.open(DealComponent, dialogConfig);
    
        modalDialog.afterClosed().subscribe((results) => {
          console.log(
            `Deal Dialog closed result: ${JSON.stringify(results)}`
          );
        });
      }

      profileData() {
        this.httpService.getProfile()
        .pipe(map(response => response.payload || null))
        .subscribe((userProfileRes: UserProfileResponse) => {
          let {displayName, email, mobile} = userProfileRes;
          this.updateProfileData.next({displayName, email, mobile});
        });
      }

}
