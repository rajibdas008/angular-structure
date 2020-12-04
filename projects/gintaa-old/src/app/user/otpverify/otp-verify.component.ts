import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';
import { timer } from 'rxjs';
import { FirebaseAuthService } from '@gintaa/shared/services/auth/firebase.auth.service';
import { map, take } from 'rxjs/operators';
import { CommonHttpService, AlertService, PlaceService } from '@gintaa/shared';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import { UserInfo, UserProfileResponse } from '@gintaa/shared/modals';
import { fadeAnimation } from '@gintaa/animations';


@Component({
  selector: 'app-otpverify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss'],
  animations: [fadeAnimation]
})
export class OtpVerifyComponent implements OnInit {
  // gtagCategory = GtagCategory;
  // gtagAction = GtagAction;
  // gtagParam = { event_label: 'Clicked on VERIFY button' };

  confirmationResult: firebase.auth.ConfirmationResult;
  userInfo: UserInfo;
  isValidOtp: boolean;
  otp: string = null;

  @ViewChild('userForm', { static: false }) public userFrm: NgForm;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

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
  isProcessVerify: boolean;
  countDown;
  counter = 60;
  tick = 1000;
  showTimer: boolean;
  
  constructor(
    private router: Router,
    private httpService: CommonHttpService,
    private authService: AuthService,
    private alertService: AlertService,
    private fireAuthService: FirebaseAuthService,
    public placeService: PlaceService
  ) {
    this.userInfo = new UserInfo();
    this.isValidOtp = true;
    this.subscribeForInput();
  }
  ngOnInit() {
    this.setTimer();
  }
  subscribeForInput() {
    this.fireAuthService.signInConfirmationResultSub.subscribe(
      (input) => {
        if (input) {
          this.userInfo.mblNo = input.phoneNumber;
          this.confirmationResult = input.confirmationRes;
        }
      });
  }
  setTimer() {
    this.showTimer = true;
    this.countDown = timer(0, this.tick)
      .pipe(
        take(this.counter),
        map(() => --this.counter)
      );
  }

  onOtpChange(otp) {
    if (!this.isValidOtp) {
      this.isValidOtp = true;
    }
    this.otp = otp;
  }

  onPasteOtp(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    this.setVal(pastedText);
  }

  isVerifyOtp() {
    if (this.otp === null || this.otp.length < 6) {
      return true;
    }
    return false;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  onKeyupEvent(event: any) {
    if (event.keyCode === 13 && !this.isVerifyOtp()) {
      this.logIn();
    }
  }

  logIn() {
    // this.verifyOtp();
    this.verifyOtpWithFirebase();
  }
  // verifyOtp() {
  //   this.isProcessVerify = true;
  //   const reqBody = {
  //     otp: this.otp,
  //     mobile: this.userInfo.mblNo
  //   };
  //   this.httpService.verifyOtp(reqBody)
  //     .subscribe(
  //       (response) => {
  //         this.isValidOtp = true;
  //         let token = response.headers.get('Authorization');
  //         if (!token) {
  //           this.isProcessVerify = false;
  //           this.alertService.showMessage('We are facing some trouble. Please try later');
  //         } else {
  //           token = token.split(' ')[1];
  //           this.authService.setToken(true, token);
  //           // profile api call for getting profile complete flag
  //           this.httpService.getProfile()
  //             .pipe(
  //               map(res => {
  //                 const profileInfo = res.payload || new UserProfileResponse() as UserProfileResponse;
  //                 const images = profileInfo.images || [];
  //                 this.authService.setUsername(profileInfo.firstName || profileInfo.mobile);
  //                 if (images.length > 0) {
  //                   this.authService.setProfileImage(images[0].url);
  //                 }
  //                 return profileInfo;
  //               })
  //             ).subscribe(
  //               (profileInfo) => {
  //                 const isProfileCompleted = profileInfo.isProfileCompleted;
  //                 this.isProcessVerify = false;
  //                 if (isProfileCompleted === 'true') {
  //                   this.router.navigate(['/user-home']);
  //                 } else {
  //                   this.router.navigate(['/profile']);
  //                 }
  //               },
  //               (errResponse) => {
  //                 console.log(`Error from  get profile api from otp verify callback: ${JSON.stringify(errResponse)}`);
  //                 if (errResponse && !errResponse.ok) {
  //                   this.alertService.showMessage('Fail to get profile from server');
  //                 }
  //                 this.isProcessVerify = false;
  //               }
  //             );
  //         }
  //       },
  //       (errResponse) => {
  //         this.authService.setToken(false, '', '');
  //         this.isValidOtp = false;
  //         this.isProcessVerify = false;
  //       }
  //     );
  // }

  resetOtp() {
    this.ngOtpInput.setValue('');
    this.isValidOtp = true;
  }

  sentOtp() {
    this.showTimer = false;
    this.resetOtp();
    const reqBody = {
      mobile: this.userInfo.mblNo
    };

    this.httpService.sentOtp(reqBody)
      .subscribe(
        (data) => {
          // console.log(`response from sent otp: ${JSON.stringify(data)}`);
          const navigationExtras: NavigationExtras = {
            queryParams: {
              mblNo: this.userInfo.mblNo
            }
          };
          // this.alertService.showInfo(`Otp sent to your mobile no ${this.userInfo.mblNo}`);
          this.router.navigate(['/otpverify'], navigationExtras);
          this.counter = 60;
          this.setTimer();
        },
        (errResponse) => { });
  }

  async verifyOtpWithFirebase() {
    try {
      this.isProcessVerify = true;
      const result = await this.confirmationResult.confirm(this.otp);
      this.isValidOtp = true;
      this.routeToProfileOrDashboard();
    } catch (err) {
      console.log(JSON.stringify(err));
      this.isValidOtp = false;
      this.isProcessVerify = false;
    }
  }

  routeToProfileOrDashboard() {
    //this.placeService.selectedCity(this.placeService.currentCity);
    this.httpService.getProfile()
    .pipe(
      map(res => {
        const profileInfo = res.payload || new UserProfileResponse() as UserProfileResponse;
        const images = profileInfo.images || [];
        this.authService.setUsername(profileInfo.displayName || profileInfo.name || profileInfo.mobile);
        this.authService.setUserVerified(profileInfo.userVerified);        
        if (images.length > 0) {
          this.authService.setProfileImage(images[0].url);
        }
        return profileInfo;
      })
    ).subscribe(
      (profileInfo) => {
        const userVerified = profileInfo.userVerified;
        this.isProcessVerify = false;
        if (userVerified === true) {
          this.router.navigate(['/user-home']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
      (errResponse) => {
        console.log(`Error from  get profile api from otp verify callback: ${JSON.stringify(errResponse)}`);
        if (errResponse && !errResponse.ok) {
          this.alertService.showMessage('Fail to get profile from server');
        }
        this.isProcessVerify = false;
      }
    );
  }

  async resendOtp() {
    try {
      this.showTimer = false;
      this.resetOtp();
      const confirmationRes = await this.fireAuthService.signInWithPhoneNumber(this.userInfo.mblNo);
      this.routeToVerifyOtp();
      this.counter = 60;
      this.setTimer();
    } catch (err) {
      console.log(JSON.stringify(err));
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

}
