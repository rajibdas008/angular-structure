import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import { AlertService, CommonHttpService } from '@gintaa/shared';
import { UserInfo, UserProfileResponse } from '@gintaa/shared/modals';
import { map } from 'rxjs/operators';
import { FirebaseAuthService } from '@gintaa/shared/services/auth/firebase.auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // gtagCategory = GtagCategory;
  // gtagAction = GtagAction;
  // gtagParam = { event_label: 'Clicked on Get Started' };

  @ViewChild('userForm', {static: false}) public userFrm: NgForm;
  @ViewChild('emailAndPasswordForm', {static: false}) public emailAndPasswordForm: NgForm;
  userInfo: UserInfo;
  loggedInErrorMsg: string = '';
  constructor(private router: Router,
              private httpService: CommonHttpService,
              private fireAuthService: FirebaseAuthService,
              private authService: AuthService,
              private alertService: AlertService
              ) {
  }

  ngOnInit() {
    this.userInfo = new UserInfo();
  }
  onKeyupEvent(event: any) {
    if (event.keyCode === 13 && this.userFrm.form.valid) {
      this.getOtp();
    }
  }
  keyPress(event: any) {
    if (event.charCode !== 0) {
        const pattern = /[0-9\+\-\ ]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
  }
  async getOtp() {
    // this.sentOtp();
    await this.signUp();
  }

  sentOtp() {
    const reqBody = {
      mobile: this.userInfo.mblNo
    };

    this.httpService.sentOtp(reqBody)
      .subscribe(
        (data) => {
          //console.log(`response from sent otp: ${JSON.stringify(data)}`);
          const navigationExtras: NavigationExtras = {
            queryParams: {
                mblNo: this.userInfo.mblNo
            }
          };
          // this.alertService.showInfo(`Otp sent to your mobile no ${this.userInfo.mblNo}`);
          this.router.navigate(['/otpverify'], navigationExtras);
        },
        (errResponse) => {});
  }

  async signUp() {
    try {
      const confirmationRes = await this.fireAuthService.signInWithPhoneNumber(`+91 ${this.userInfo.mblNo}`);
      this.routeToVerifyOtp();
    } catch (err) {
      console.log('Error:::', JSON.stringify(err));
      this.fireAuthService.firebaseAuthError.next(err);
      this.loggedInErrorMsg = err.message;
    }
  }
  routeToVerifyOtp() {
    this.router.navigate(['/otpverify']);
  }

  async signInWithGoogle(){
    try{
     const res = await this.fireAuthService.signInWithGoogle()
     this.routeToProfileOrDashboard();
    }catch(error){
      console.log('Error:::', JSON.stringify(error));
      this.fireAuthService.firebaseAuthError.next(error);
    }
  }

  async signInWithFacebook(){
    try{
     const res = await this.fireAuthService.signInWithFacebook()
     this.routeToProfileOrDashboard();
    }catch(error){
      console.log('Error:::', JSON.stringify(error));
      this.fireAuthService.firebaseAuthError.next(error);
    }
  }

  async createUserWithEmailAndPassword(){
    try{
     const res = await this.fireAuthService.createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password);
     this.routeToProfileOrDashboard();
    }catch(error){
      console.log('Error:::', JSON.stringify(error));
      if(error.code == 'auth/email-already-in-use'){
          this.signInWithEmailAndPassword();
      } else {
        this.fireAuthService.firebaseAuthError.next(error);
      }
    }
  }

  async signInWithEmailAndPassword(){
    try{
     const res = await this.fireAuthService.signInWithEmailAndPassword(this.userInfo.email, this.userInfo.password);
     this.routeToProfileOrDashboard();
    }catch(error){
      console.log('Error:::', JSON.stringify(error));
      if(error.code == 'auth/wrong-password'){
        this.alertService.showMessage('Password is incorrect!');
      } else if(error.code =='auth/too-many-requests') {
        this.alertService.showMessage('Too many request sent!');
      } else {
        this.fireAuthService.firebaseAuthError.next(error);
      }
    }
  }

  routeToProfileOrDashboard() {
    this.httpService.getProfile()
    .pipe(
      map(res => {
        const profileInfo = res.payload || new UserProfileResponse() as UserProfileResponse;
        const images = profileInfo.images || [];
        this.authService.setUsername(profileInfo.displayName || profileInfo.name || profileInfo.mobile);
        if (images.length > 0) {
          this.authService.setProfileImage(images[0].url);
        }
        return profileInfo;
      })
    ).subscribe(
      (profileInfo) => {
        const userVerified = profileInfo.userVerified;
        if (userVerified === true) {
          this.router.navigate(['/user-home']);
        } else {
          this.router.navigate(['/profile']);
        }
        // if(profileInfo.firstName == null && profileInfo.lastName == null){
        //   const userRes = reqBody.user;
        //   const fullName = userRes.displayName || userRes.fullName || userRes.userName || '';
        //   const firstName = fullName.substring(0, fullName.lastIndexOf(" "));
        //   const lastName = fullName.substring(fullName.lastIndexOf(" ")+1,fullName.length);
        //   const userData = new UserProfileUpdateRequest();
        //   if(userRes.email == '' || userRes.email == null)
        //   userData.email = userRes.email;
        //   if(userRes.firstName == '' || userRes.firstName == null)
        //   userData.firstName = firstName;
        //   if(userRes.lastName == '' || userRes.lastName == null)
        //   userData.lastName = lastName;
        //   if(userRes.email == '' || userRes.email == null)
        //   userData.mobile = userRes.phoneNumber;
        //   this.httpService.editProfile(userData).subscribe((res)=>{
        //     if (isProfileCompleted === 'true') {
        //       this.router.navigate(['/user-home']);
        //     } else {
        //       this.router.navigate(['/profile']);
        //     }
        //   },(error)=>{
        //     console.log('Error:::', JSON.stringify(error));
        //     if (isProfileCompleted === 'true') {
        //       this.router.navigate(['/user-home']);
        //     } else {
        //       this.router.navigate(['/profile']);
        //     }
        //   })
        // } else {
        //   if (isProfileCompleted === 'true') {
        //     this.router.navigate(['/user-home']);
        //   } else {
        //     this.router.navigate(['/profile']);
        //   }
        // }
      },
      (errResponse) => {
        console.log(`Error from  get profile api from otp verify callback: ${JSON.stringify(errResponse)}`);
        if (errResponse && !errResponse.ok) {
          this.alertService.showMessage('Fail to get profile from server');
        }
      }
    );
  }
}
