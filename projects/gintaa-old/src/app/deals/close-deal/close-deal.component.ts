import { Component, OnInit, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { DealService } from '@gintaa/shared/services/deal.service';
import { InjectDialogData, DealStateData, DealResponseErrorObj } from '@gintaa/shared/modals';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-close-deal',
  templateUrl: './close-deal.component.html',
  styleUrls: ['./close-deal.component.scss']
})
export class CloseDealComponent implements OnInit {

  @Input() data: InjectDialogData;
  @Output() dialogClosed = new EventEmitter<any>();
  @Output() showUserRating = new EventEmitter<DealStateData>();

  logConsole = true;
  debugMode = false;

  userStatus = 'offline';
  defaultImage = 'assets/images/no-image.svg';
  userFullName: string;
  userProfileImage: string;
  currentUserId: string;

  otp: string;
  otpMinLength = 6;
  isOtpInvalid = false;
  otpConfig = {
    length: this.otpMinLength
  };

  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };

  constructor(
    private dealService: DealService,
    @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const loggedUser = localStorage.getItem('user');
      if (loggedUser) {
        this.currentUserId =  (JSON.parse(loggedUser).userId) ? JSON.parse(loggedUser).userId : null;
      }
    }
  }

  ngOnInit() {
    // setting test data [if in debugMode]
    this.setDebugPoints();

    if (this.data && this.data.dealId) {
      this.setInitialDetails();
    }
  }

  setInitialDetails() {
    // setting user's image and status
    this.dealService.getDealDetails(this.data.dealId).subscribe((response: any) => {
      if (response.payload) {
        if (this.currentUserId === response.payload.sender.id) {
          // tslint:disable-next-line: max-line-length
          if (this.logConsole) { console.log('[CLOSE DEAL]', response.payload.receiver.name, this.currentUserId, response.payload.sender.id); }
          this.userFullName = response.payload.receiver.name;
          this.userProfileImage = (response.payload.receiver.imageUrl) ? response.payload.receiver.imageUrl : this.defaultImage;
        } else {
          // tslint:disable-next-line: max-line-length
          if (this.logConsole) { console.log('[CLOSE DEAL]', response.payload.receiver.name, this.currentUserId, response.payload.sender.id); }
          this.userFullName = response.payload.sender.name;
          this.userProfileImage = (response.payload.sender.imageUrl) ? response.payload.sender.imageUrl : this.defaultImage;
        }
      }
    }, error => {
      if (error && error.error) {
        this.setErrorObject(error.error);
      }
    });
  }

  onOtpChange(otp: any) {
    this.isOtpInvalid = false;
    this.otp = otp;
    this.resetErrorObject();
  }

  checkOTPFormat(otp: any) {
    return parseInt(otp, 10);
  }

  onSubmitCloseDeal() {
    // call deal close API
    if (this.data.dealId
        && this.otp && this.otp.length === this.otpMinLength
        && this.otp.match(/^[0-9]+$/)
        && !this.debugMode) {
      this.dealService.closeDeal(this.data.dealId, this.otp)
        .subscribe((closeDealResponse: any) => {
          console.log('[DEAL CLOSED]', closeDealResponse);
          this.isOtpInvalid = false;
          this.emitShowUserRating();
        }, error => {
          this.isOtpInvalid = true;
          this.setErrorObject(error.error);
        });
    } else {
      this.isOtpInvalid = true;
      this.setErrorObject({
        ...this.responseErrorObject,
        showError: true,
        code: 400,
        message: 'Invalid OTP',
      });
    }

    // on Sucess load the user rating screen
    // this is for debug mode
    if (this.debugMode) {
      this.emitShowUserRating();
    }
  }

  emitShowUserRating() {
    if (this.logConsole) { console.log('[emitted] showUserRating'); }
    this.showUserRating.emit({
      sourcePage: 'CLOSE_DEAL',
      status: 'DEAL_CLOSED',
      dealId: this.data.dealId
    });
  }

  setDebugPoints() {
    if (this.debugMode === true) {
      console.log('%c ALERT!! YOU ARE USING THIS IN DEBUG MODE.. ', 'background: #D32F2F; color: #FFCDD2');
      if (!this.data) {
        this.data = {
          dealId: 'c6e2f0a9-4cbe-495d-a4c3-5c95a98ba07f',
          user: null,
          myOffers: null,
          currentOffer: null
        };
      } else if (!this.data || !this.data.dealId) {
        this.data.dealId = 'c6e2f0a9-4cbe-495d-a4c3-5c95a98ba07f';
      }
    }
  }

  onDialogClose() {
    if (this.logConsole) { console.log('[emitted] onDialogClose'); }
    this.dialogClosed.emit();
  }

  setErrorObject(error: DealResponseErrorObj) {
    console.log('[CLOSE DEAL] error:', error);
    let errorMsg = error.message;
    if (!error.message) {
      if (error.payload) {
        errorMsg = error.payload[0].errorDetailedReason;
      } else {
        errorMsg = 'Error occurd while fetching deal details';
      }
    }
    this.responseErrorObject = {
      ...this.responseErrorObject,
      showError: true,
      code: error.code,
      message: errorMsg
    };
  }

  resetErrorObject() {
    this.responseErrorObject = {
      ...this.responseErrorObject,
      showError: false,
      code: 200,
      message: ''
    };
  }

}
