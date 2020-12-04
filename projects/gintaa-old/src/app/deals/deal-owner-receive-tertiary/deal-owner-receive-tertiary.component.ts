import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  InjectDialogData, DealInjectOffer,
  DealResponseErrorObj,
  DealDetailsFormat,
  DealSnapshot, DealStateData,
  DealResponseHttp
} from '@gintaa/shared/modals';
import { DealService } from '@gintaa/shared/services/deal.service';

@Component({
  selector: 'app-deal-owner-receive-tertiary',
  templateUrl: './deal-owner-receive-tertiary.component.html',
  styleUrls: ['./deal-owner-receive-tertiary.component.scss']
})
export class DealOwnerReceiveTertiaryComponent implements OnInit {
  @Input() data: InjectDialogData;
  @Output() dialogClosed = new EventEmitter<{ dealInitiated: boolean }>();
  @Output() dealAcceptStatus = new EventEmitter<{ sourcePage: string, status: string, dealId: string }>();
  @Output() dealConfirmationInitiated = new EventEmitter<DealStateData>();

  logConsole = true;
  offerOwnerStatus = 'offline';
  offerOwnerProfileIage = 'assets/images/no-image.svg';
  selectedOfferDetails: DealInjectOffer;
  updateDealResponseObj: DealDetailsFormat;
  dealDetails: DealDetailsFormat;
  updateDealSnapshotObj: DealSnapshot;
  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };

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
    this.dealService.getDealDetails(dealId).subscribe((response: any) => {
      // save the deal response object
      this.updateDealResponseObj = {
        ...this.updateDealResponseObj,
        amountCurrency: response.payload.amountCurrency,
        dealRefId: response.payload.dealRefId,
        dealStatus: response.payload.dealStatus,
        dealSentTimeStamp: response.payload.dealSentTimeStamp,
        dropToGintaaJunction: response.payload.dropToGintaaJunction,
        includeInsurance: response.payload.includeInsurance,
        includeShipping: response.payload.includeShipping,
        junctionDetailsView: response.payload.junctionDetailsView,
        receiver: response.payload.receiver,
        requestedAmount: response.payload.requestedAmount,
        sender: response.payload.sender,
        offeredOffers: response.payload.offeredOffers,
        requestedOffers: response.payload.requestedOffers,
        expiryDatetime: response.payload.expiryDatetime,
        comments: response.payload.comments,
        requestedUpdate: false,
        requestedUpdateComment: 'This is an urgent request. Please update the deal.',
        offeredAmount: response.payload.offeredAmount || 0,
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
    this.dialogClosed.emit({
      dealInitiated: false
    });
  }

  onCloseDeal() {
    if (this.logConsole) { console.log('[emitted] onSubmitDealSuccess'); }
    this.dealConfirmationInitiated.emit({
      sourcePage: 'CLOSE_DEAL',
      status: 'DEAL_CLOSE_INITIATED',
      dealId: this.data.dealId,
    });
  }
}
