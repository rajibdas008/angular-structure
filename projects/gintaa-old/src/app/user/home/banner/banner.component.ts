import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CommonHttpService } from '@gintaa/shared';
import { UserInfo } from '@gintaa/shared/modals';
import { NgForm } from '@angular/forms';
import { FirebaseAuthService } from '@gintaa/shared/services/auth/firebase.auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  // gtagCategory = GtagCategory;
  // gtagAction = GtagAction;
  // gtagParam = { event_label: 'Clicked on Get Started' };

  submitted = false;
  @ViewChild('userForm', {static: false}) public userFrm: NgForm;
  userInfo: UserInfo;
  isStarted: boolean;

  constructor(
    private router: Router,
    private httpService: CommonHttpService,
    public fireAuthService: FirebaseAuthService
    ) {}

  ngOnInit() {
    this.userInfo = new UserInfo();
  }

  async sendOtp() {
    this.submitted = true;
    if (this.userFrm.valid) {
      this.sentSms();
    }
  }

  keyPress(event: any) {
    if (event.charCode !== 0) {
        this.submitted = false;
        const pattern = /[0-9\+\-\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
      }
    }

  sentSms() {
    this.httpService.sentOtp({mobile: this.userInfo.mblNo})
      .subscribe(
        (data) => {
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

  async sendOtpWithFirebase() {
    this.submitted = true;
    if (this.userFrm.valid) {
      this.isStarted = true;
      this.signUp();
    }
  }

  async signUp() {
    try {
      const confirmationRes = await this.fireAuthService.signInWithPhoneNumber(`+91 ${this.userInfo.mblNo}`);
      this.routeToVerifyOtp();
    } catch (err) {
      this.isStarted = false;
      console.log(JSON.stringify(err));
      this.fireAuthService.firebaseAuthError.next(err);
    }
  }

  routeToVerifyOtp() {
    this.router.navigate(['/otpverify']);
  }
}
