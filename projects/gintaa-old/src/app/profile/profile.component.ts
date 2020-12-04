import {
  AfterViewInit, 
  Component, 
  ElementRef, 
  OnInit, 
  ViewChild, 
  OnDestroy
} from '@angular/core';
import {
  ActivatedRoute, 
  Router
} from '@angular/router';
import { 
  FormBuilder, 
  Validators, 
  FormControl 
} from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDateFormats, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { timer, Observable, Subscription } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { CommonHttpService, FormErrorService, UserProfileIncompleteService } from '@gintaa/shared';
import { UserProfileResponse, UserProfileUpdateRequest } from '@gintaa/shared/modals';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationVerification } from '@gintaa/shared/modals/NotificationVerification';
import { Constants } from '@gintaa/constants';
import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireAnalytics } from '@angular/fire/analytics';

// https://stackblitz.com/edit/angular-date-picker-sample-fr?file=app%2Fapp.component.html
// https://material.angular.io/components/datepicker/overview

export const MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'D/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM Y',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM Y'
  }
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS},
    {provide: DateAdapter, useClass: MomentDateAdapter}
  ]
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy  {

  @ViewChild('modalOpenBtn', { static: false }) modalOpenBtn: ElementRef;
  @ViewChild('ngOtpInput', {static: false}) ngOtpInput: any;
  @ViewChild('ngOtpInputEmail', {static: false}) ngOtpInputEmail: any;
  @ViewChild('closeModalBtn', {static: false}) closeModalBtn: ElementRef;
  @ViewChild('closeModalBtn1', {static: false}) closeModalBtn1: ElementRef;
  isFormSubmitted = false;
  otp: string;
  otpSubscription: Subscription;
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
  userInfo: UserProfileResponse;
  profileImageUrl: string;
  profileForm: any;
  inactive = false;
  newMobileNo: string = null;
  oldEmail: string;

  isInvalidEmail = false;
  isOtpInvalid = false;
  isEmailOtpInvalid = false;
  serverError = '';
  serverEmailError = '';
  isInvalidAge: boolean;
  serverDobError: any;

  countDown;
  counter = 60;
  tick = 1000;
  showTimer: boolean;
  active = false;
  emailVerifyMailSent: boolean;
  resendotpSubscription: Subscription;
  datePlaceholder: string = Constants.DATE_FORMAT;
  isUserProfileComplete: boolean;
  mobileOtpTransactionId: string;
  emailOtpTransactionId: string;
  today = new Date();
  minDatePicker: any;
  FormReadMode: boolean = true;
  constructor(
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private httpService: CommonHttpService,
  private authService: AuthService,
  private datePipe: DatePipe,
  private toastr: ToastrService,
  private fb: FormBuilder,
  private formErrorService: FormErrorService,
  private fireAuth: AngularFireAuth,
  private profileIncompleteService: UserProfileIncompleteService
  // private analytics: AngularFireAnalytics
  ) {
      this.userInfo = new UserProfileResponse();
      this.fireAuth.authState.subscribe(async (user) => {
        if (user) {
            console.log('user setFirebaseUser:::', user);
            if(!this.authService.getSignInInput()) {
              this.authService.setFirebaseUser(user);              
            } 
            this.setProfile();
        }
      });     

      this.profileForm = this.fb.group({
          name:  new FormControl(
            {value: this.userInfo.name, disabled: false},
            [Validators.required]),
          phoneNo: new FormControl(
            {value: this.newMobileNo, disabled: false},
            //[Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]
            ),
          gender: new FormControl({value: this.userInfo.gender, disabled: false}, []),
          email: new FormControl(
            {value: this.userInfo.email, disabled: false},
           // [Validators.required, Validators.email]
          ),
          dob: new FormControl(''),
      });
  }
  
  ngOnInit() {
    const newDate = this.today.setFullYear(this.today.getFullYear()-18);
    this.minDatePicker = new Date(newDate); 
    this.setTimer();
    this.profileForm.valueChanges
    .subscribe(value => {
      if (this.profileForm.dirty && this.profileForm.status === 'VALID') {
        this.active = true;
      } else {
        this.active = false;
      }
    });

    this.profileIncompleteService.updateProfileData$
    .subscribe((res: any) => {
      if(res.displayName && res.displayName !== this.profileForm.get("name").value) {
        this.profileForm.get("name").setValue(res.displayName);
        this.profileForm.get("name").updateValueAndValidity();
        this.userInfo.name = res.displayName;
      }
      if(res.email && res.email !== this.profileForm.get("email").value) {
        this.profileForm.get("email").setValue(res.email);
        this.profileForm.get("email").updateValueAndValidity();
      }
      if(res.mobile && res.mobile !== this.profileForm.get("phoneNo").value) {
        this.profileForm.get("phoneNo").setValue(res.mobile);
        this.profileForm.get("phoneNo").updateValueAndValidity();
        this.newMobileNo = res.mobile;
      }
      this.triggerUserInfoChange();
    })
  }

  ngAfterViewInit() {
      this.triggerUserInfoChange();
  }

  ngOnDestroy() {
    if(this.otpSubscription)
    this.otpSubscription.unsubscribe();
    if(this.resendotpSubscription)
    this.resendotpSubscription.unsubscribe();
  }

  setTimer() {
    this.showTimer = true;
    this.countDown = timer(0, this.tick)
      .pipe(
        take(this.counter),
        map(() => --this.counter)
      );
  }

  get f() { return this.profileForm.controls; }

  setProfile() {
    this.userInfo = new UserProfileResponse();
    this.handlingNullValues();
    this.httpService.getProfile()
        .pipe(
            map(res => {
                if (res.payload) {
                    this.userInfo = res.payload;
                    this.userInfo.name =  res.payload.displayName;
                    this.oldEmail = this.userInfo.email;
                    this.newMobileNo = this.userInfo.mobile && this.userInfo.mobile.includes('+91') ? 
                    this.userInfo.mobile.slice(3, this.userInfo.mobile.length) : this.userInfo.mobile;
                    let parts = [];
                    let dobFormat = '';
                    if (this.userInfo.dob) {
                      parts = this.userInfo.dob.split('-');
                      //parts[1] = parts[1] - 1;
                      dobFormat = `${parts[2]}-${parts[1]}-${parts[0]}`;
                    }
                    // setting forms value
                    const formValues = {
                      name: this.userInfo.name,
                      phoneNo: this.newMobileNo,
                      gender: this.userInfo.gender,
                      email: this.userInfo.email,
                    };

                    if (parts.length) {
                      // tslint:disable-next-line: no-string-literal
                      formValues['dob'] = new Date(dobFormat);
                    }
                    this.profileForm.patchValue(formValues);

                    this.handlingNullValues();
                    this.triggerUserInfoChange();
                }
                return this.userInfo;
            })
        )
      .subscribe(
        (userInfo) => {
          //console.log(`response body from get profile api: ${JSON.stringify(userInfo)}`);
          // setting username in header
          this.triggerUserInfoChange();
          if (this.userInfo.images && this.userInfo.images.length > 0) {
              this.profileImageUrl = this.userInfo.images[this.userInfo.images.length-1].url;
          } else {
              this.profileImageUrl = '/assets/images/profile-1.png';
          }
          this.isUserProfileComplete = this.userInfo.userVerified;
        },
        (errResponse) => {
          console.log(`Error from  get profile api: ${JSON.stringify(errResponse)}`);
          if (errResponse && !errResponse.ok) {
            this.toastr.error('Fail to get profile from server');
          }
        }
      );
  }

  private triggerUserInfoChange() {
      if ((this.userInfo.name && this.userInfo.name.trim() !== '') || (this.userInfo.displayName && this.userInfo.displayName.trim() !== '')) {
          this.authService.setUsername(this.userInfo.name || this.userInfo.displayName);
      } else {
          this.authService.setUsername(this.newMobileNo);
      }
      if (this.userInfo.images && this.userInfo.images.length > 0) {
        this.authService.setProfileImage(this.userInfo.images[0].url);
      }
  }

  handlingNullValues() {
      this.userInfo.address = this.userInfo.address || [];
      this.userInfo.images = this.userInfo.images || [];
  }

  // enableEditProfile() {
  //     this.inactive = false;
  //     this.enableFormControl();
  // }

  enableFormControl() {
    Object.keys(this.profileForm.controls).forEach(key => {
      this.profileForm.controls[key].enable();
    });
  }
  /**
   * This is handler for editing profile details
   */
editProfile(event: any) {
    window.scroll(0,0);
    // this.analytics.logEvent('profile');
    this.isFormSubmitted = true;
    //this.profileForm.controls.lastName.setErrors(null);
    if (!this.profileForm.valid) {
      return;
    }
    this.isOtpInvalid = false;
    this.isInvalidEmail = false;
    this.isInvalidAge = false;
    const userProfileUpdateReq = new UserProfileUpdateRequest();
    const formValues = this.profileForm.value;
    const name = formValues.name.trim();
    const gender = formValues.gender;
    //const email = formValues.email;
    const dob = formValues.dob;
    // if (name && name.split(' ').length === 1) {
    //   userProfileUpdateReq.firstName = name.trim();
    //   userProfileUpdateReq.lastName = '';
    // } else {
    //   userProfileUpdateReq.firstName = name.split(' ').slice(0, -1).join(' ').trim();
    //   userProfileUpdateReq.lastName = name.split(' ').slice(-1).join(' ').trim();
    // }
    userProfileUpdateReq.name = name;
    // if (this.userInfo.lastUpdatedEmail !== email) {
    //     userProfileUpdateReq.email = email;
    // }
    userProfileUpdateReq.gender = gender;
    if (dob) {
        userProfileUpdateReq.dob = this.datePipe.transform(dob, 'dd-MM-yyyy');
    }
    this.httpService.editProfile(userProfileUpdateReq)
      .subscribe(
        (response) => {
          this.userInfo = response.payload || new UserProfileResponse();
          console.log('User Info:::', this.userInfo.name);
          this.authService.updateFirebaseUser(this.userInfo);
          // if (this.userInfo.firstName == null) {
          //   this.userInfo.firstName = '';
          // }
          // if (this.userInfo.lastName == null) {
          //   this.userInfo.lastName = '';
          // }
          //this.userInfo.fullName = `${this.userInfo.firstName} ${this.userInfo.lastName}`;
          // this.inactive = true;
          this.active = false;
          this.profileForm.markAsPristine();
          // this.disableFormControl();
          this.triggerUserInfoChange();
          //this.isUserProfileComplete =  this.userInfo.userVerified;
          this.setProfile();
          // if (isProfileCompleted === 'true') {
          //   this.router.navigate(['/user-home']);
          // }
          this.FormReadMode = true;
        },
        (errResponse) => {
          if (errResponse.error.message && errResponse.error.message.indexOf('email') > 0) {
            this.isInvalidEmail = true;
            this.serverEmailError = errResponse.error.message;
          }
          if (errResponse.error.message && errResponse.error.message.indexOf('age') > 0) {
            this.isInvalidAge = true;
            this.serverDobError = errResponse.error.message;
          }
          this.formErrorService.processError(errResponse, this.profileForm.controls);
        }
      );
  }

disableFormControl() {
  Object.keys(this.profileForm.controls).forEach(key => {
    if (key !== 'dob') {
      this.profileForm.controls[key].disable();
    }
  });
}

verifyEmail() {
    console.log('Form Value:::', JSON.stringify(this.profileForm.value));
    const nt = new NotificationVerification();
    nt.verificationIdentifierType = 'email';
    nt.identifier =  this.profileForm.controls.email.value;
    this.httpService.sendNotificationEmail(nt)
    .subscribe(
        resp => {
            if (resp.success) {
                //this.setProfile();
                this.emailVerifyMailSent = true;
                // this.toastr.success(resp.message);
            } else {
                this.emailVerifyMailSent = false;
                // this.toastr.error(resp.message);
            }
        },
        err => {
          this.emailVerifyMailSent = false;
        }
    );
  }

onOtpChange(otp) {
    this.isOtpInvalid = false;
    this.otp = otp;
}

setVal(val) {
  this.ngOtpInput.setValue(val);
}

onPasteOtp(event: ClipboardEvent) {
  const clipboardData = event.clipboardData || (window as any).clipboardData;
  const pastedText = clipboardData.getData('text');
  this.setVal(pastedText);
}

getOtp() {
  this.otpSubscription = this.sentOtp().subscribe(
    resp => {
      if (resp.success) {
        this.mobileOtpTransactionId = resp.payload.verificationTransactionId;
        this.modalOpenBtn.nativeElement.click();        
        this.setTimer();
      }
    },
    errResp => {
      // console.log('error!!!!!');
      this.isOtpInvalid = true;
      this.serverError = errResp.error.message;
      this.counter = 60;
      this.closeModalBtn.nativeElement.click();
    }
  );
}

getOtpEmail() {
  this.otpSubscription = this.sentOtpForEmail().subscribe(
    resp => {
      if (resp.success) {
        this.emailOtpTransactionId = resp.payload.verificationTransactionId;
        this.modalOpenBtn.nativeElement.click();        
        this.setTimer();
      }
    },
    errResp => {
      // console.log('error!!!!!');
      this.isEmailOtpInvalid = true;
      this.serverEmailError = errResp.error.message;
      this.counter = 60;
      this.closeModalBtn1.nativeElement.click();
    }
  );
}

resendOtp() {
  this.resendotpSubscription = this.sentOtp().subscribe(
    (response: any) => {
      this.resetOtp();
      this.mobileOtpTransactionId = response.payload.verificationTransactionId;
      this.setTimer();
    },
    (error: any) => {
      this.isOtpInvalid = true;
      this.serverError = error.error.message;
      this.counter = 60;
      this.closeModalBtn.nativeElement.click();
    }
  );
}

resendOtpForEmail() {
  this.resendotpSubscription = this.sentOtpForEmail().subscribe(
    (response: any) => {
      this.resetOtpEmail();
      this.emailOtpTransactionId = response.payload.verificationTransactionId;
      this.setTimer();
    },
    (error: any) => {
      this.isEmailOtpInvalid = true;
      this.serverEmailError = error.error.message;
      this.counter = 60;
      this.closeModalBtn.nativeElement.click();
    }
  );
}

sentOtp(): Observable<any> {    
    this.resetOtp();
    const mobileNotification = new NotificationVerification();
    mobileNotification.verificationIdentifierType = 'mobile';
    mobileNotification.identifier = this.profileForm.controls.phoneNo.value;
    return this.httpService.sendNotificationMobile(mobileNotification);      
}

sentOtpForEmail(): Observable<any> {    
    this.resetOtpEmail();
    const input = new NotificationVerification();
    input.verificationIdentifierType = 'email';
    input.identifier = this.profileForm.controls.email.value;
    return this.httpService.sendNotificationEmail(input);      
  }  

verifyOtp() {
  const otp = this.otp;
  const reqBody = {
    verificationTransactionId: this.mobileOtpTransactionId, 
    verifyOtp: otp
  };
  this.httpService.verifyMobile(reqBody)
    .subscribe(
        resp => {
          this.isOtpInvalid = false;
          this.setProfile();
          this.authService.updateUserContactInfo(this.profileForm.get('phoneNo').value);
          this.closeModalBtn.nativeElement.click();
        },
    errResp => {
      console.log(`Error in verify otp: ${JSON.stringify(errResp)}`);
      this.isOtpInvalid = true;
      this.serverError = errResp.error.message;
    }
  );
}

verifyOtpWithEmail() {
  const otp = this.otp;
  const reqBody = {
    verificationTransactionId: this.emailOtpTransactionId, 
    verifyOtp:otp
  };
  this.httpService.verifyEmail(reqBody)
    .subscribe(
        resp => {
          this.isEmailOtpInvalid = false;
          this.setProfile();
          this.authService.updateUserContactInfo(this.profileForm.get('phoneNo').value);
          this.closeModalBtn1.nativeElement.click();
        },
    errResp => {
      console.log(`Error in verify otp: ${JSON.stringify(errResp)}`);
      this.isEmailOtpInvalid = true;
      this.serverEmailError = errResp.error.message;
    }
  );
}

resetOtp() {
  this.ngOtpInput.setValue('');
  this.isOtpInvalid = false;
  this.serverError = '';
  this.showTimer = false;
  this.counter = 60;
}

resetOtpEmail() {
  this.ngOtpInputEmail.setValue('');
  this.isEmailOtpInvalid = false;
  this.serverEmailError = '';
  this.showTimer = false;
  this.counter = 60;
}

keyPress(event: any) {
    if (event.charCode !== 0) {
        this.isOtpInvalid = false;
        const pattern = /[0-9\+\-\ ]/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
  }

keyPressAge(event: any) {
    this.isInvalidAge = false;
    const pattern = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
}

keyPressEmail(event: any) {
    //this.isInvalidEmail = false;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(event.target.value)){
      //console.log(true);
      this.isInvalidEmail = false;
    } else {
      this.isInvalidEmail = true;
      //console.log(false);
    }
}

isDisplayEmailVerifyText() {
  let isDisplay = false;
  const emailControl = this.profileForm.controls.email;
  const oldEmail = this.oldEmail;
  const newEmail = emailControl.value
  if (emailControl.invalid) {
    return isDisplay;
  }
  if (!this.emailVerifyMailSent && this.active) {
    return isDisplay;
  }
  if (newEmail !== oldEmail) {
    isDisplay = true;
  }
  if (newEmail && this.userInfo.emailVerified === false) {
    isDisplay = true;
  }
  return isDisplay;
}

disableEditProfile() {
    // mark form is not editable
    this.active = false;
    // clear form errors
    this.serverError = '';
    this.serverEmailError = '';
    this.serverDobError = '';
    this.isInvalidAge = false;
    this.isOtpInvalid = false;
    this.isInvalidEmail = false;
    this.profileForm.controls.email.setErrors(null);
    this.profileForm.reset();
    this.profileForm.markAsPristine();
}

discardChanges() {
  this.isFormSubmitted = false;
  this.disableEditProfile();
  this.setProfile();
  this.FormReadMode = true;
}

getShareCompMsg(event){
  this.setProfile();
}

readyToEdit(){
  this.active =true;
  this.FormReadMode = false;
}
}
