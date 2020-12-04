import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  InjectDialogData,
  DealInjectOffer,
  DealResponseErrorObj,
  DealStateData,
  DealDetailsFormat,
  DealSnapshot,
  DealResponseHttp
} from '@gintaa/shared/modals';
import { DealService } from '@gintaa/shared/services/deal.service';

@Component({
  selector: 'app-deal-viewer-send-secondary',
  templateUrl: './deal-viewer-send-secondary.component.html',
  styleUrls: ['./deal-viewer-send-secondary.component.scss']
})
export class DealViewerSendSecondaryComponent implements OnInit {
  @Input() data: InjectDialogData;
  @Output() dealUpdateSuccess = new EventEmitter<DealStateData>();
  @Output() dialogClosed = new EventEmitter<{ dealInitiated: boolean }>();

  selectedOfferDetails: DealInjectOffer;
  logConsole = true;
  offerOwnerStatus = 'offline';
  offerOwnerProfileIage = 'assets/images/sm-dp.jpg';
  updateDealResponseObj: DealDetailsFormat;
  updateDealSnapshotObj: DealSnapshot;
  updatedComment: string;
  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };
  showCancelDealPopup = false;
  cancelDealComment = '';

  constructor(private dealService: DealService) { }

  ngOnInit() {
    this.setInitialDetails();
    if (this.data && this.data.dealId) {
      this.getSelectedDealDetails(this.data.dealId);
      this.getSelectedDealSnapshot(this.data.dealId);
    }
  }

  setInitialDetails() {
    if (this.data.user.isOnline) {
      this.offerOwnerStatus = 'online';
    }
    if (this.data.user.image) {
      this.offerOwnerProfileIage = this.data.user.image;
    }
    if (this.data.currentOffer) {
      this.selectedOfferDetails = this.data.currentOffer;
      if (!this.data.currentOffer.image) {
        this.selectedOfferDetails.image = 'assets/images/7.jpg';
      }
    }
  }

  getSelectedDealDetails(dealId: string) {
    this.dealService.getDealDetails(dealId).subscribe((response: DealResponseHttp) => {
      if (this.logConsole) { console.log('[DEAL] deatils: ', response); }
      // save the deal response object
      this.updateDealResponseObj = {
        ...this.updateDealResponseObj,
        amountCurrency: response.payload.amountCurrency,
        dealRefId: response.payload.dealRefId,
        dealStatus: response.payload.dealStatus,
        partiallyClosedBy: response.payload.partiallyClosedBy,
        dealSentTimeStamp: response.payload.dealSentTimeStamp,
        dropToGintaaJunction: response.payload.dropToGintaaJunction,
        includeInsurance: response.payload.includeInsurance,
        includeShipping: response.payload.includeShipping,
        junctionDetailsView: response.payload.junctionView,
        meetingDate: response.payload.meetingDate,
        meetingEndTime: response.payload.meetingEndTime,
        meetingStartTime: response.payload.meetingStartTime,
        receiver: response.payload.receiver,
        requestedAmount: response.payload.requestedAmount,
        sender: response.payload.sender,
        offeredOffers: response.payload.offeredOffers,
        requestedOffers: response.payload.requestedOffers,
        expiryDatetime: response.payload.expiryDatetime,
        comments: response.payload.comments,
        requestedUpdate: false,
        requestedUpdateComment: 'This is an urgent request. Please update the deal.',
      };
    }, error => {
      if (error && error.error) {
        this.setErrorObject(error.error);
      }
    });
  }

  getSelectedDealSnapshot(dealId: string) {
    this.dealService.getDealSnapshot(dealId)
      .subscribe((response: DealResponseHttp) => {
        if (this.logConsole) { console.log('[DEAL] snapshots: ', response); }
        if (response.code === 200 && response.success === true) {
          this.updateDealSnapshotObj = response.payload;
        }
      }, error => {
        if (error && error.error) {
          this.setErrorObject(error.error);
        }
      });
  }

  requestUpdateDeal() {
    if (this.updateDealResponseObj.dealRefId) {
      this.onDealUpdateSuccess();
    } else {
      this.setErrorObject({
        code: 500,
        message: 'Internal Server Error',
        showError: true,
        success: false
      });
    }
  }

  onCancelDealPromt() {
    this.showCancelDealPopup = true;
  }

  requestCancelDeal() {
    if (this.updateDealResponseObj.dealRefId) {
      this.dealService.cancelDeal(this.updateDealResponseObj.dealRefId, this.cancelDealComment)
        .subscribe((response: DealResponseHttp) => {
          if (this.logConsole) { console.log('[DEAL] cancel: ', response); }
          if (response.code === 200) {
            this.onDialogClose();
          }
        }, error => {
          if (error && error.error) {
            this.setErrorObject(error.error);
          }
        });
    }
  }

  getDealExpireIn(expireIn: string = ''): string {
    if (!expireIn) { return ''; }
    return expireIn.substr(0, 10);
  }

  onDealUpdateSuccess(): void {
    if (this.logConsole) { console.log('[emitted] onSubmitDealSuccess'); }
    this.dealUpdateSuccess.emit({
      sourcePage: 'UPDATE_DEAL',
      status: 'DEAL_UPDATE_REQ',
      dealId: this.updateDealResponseObj.dealRefId
    });
  }

  setErrorObject(error: DealResponseErrorObj) {
    console.log('[DEAL] error:', error);
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

  onDialogClose() {
    if (this.logConsole) { console.log('[emitted] onDialogClose'); }
    this.dialogClosed.emit({
      dealInitiated: false
    });
  }

}
