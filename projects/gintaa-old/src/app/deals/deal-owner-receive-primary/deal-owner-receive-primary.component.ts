import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {
  InjectDialogData, DealInjectOffer,
  DealResponseErrorObj, DealStateData,
  DealDetailsFormat,
  DealUpdateReqFormat,
  DealResponseHttp,
  DealSnapshot,
} from '@gintaa/shared/modals';
import { DealService } from '@gintaa/shared/services/deal.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DealRejectComponent } from '../deal-reject/deal-reject.component';

@Component({
  selector: 'app-deal-owner-receive-primary',
  templateUrl: './deal-owner-receive-primary.component.html',
  styleUrls: ['./deal-owner-receive-primary.component.scss']
})
export class DealOwnerReceivePrimaryComponent implements OnInit {
  @Input() data: InjectDialogData;
  @Output() dialogClosed = new EventEmitter<{ dealInitiated: boolean }>();
  @Output() dealAcceptStatus = new EventEmitter<{ sourcePage: string, status: string, dealId: string }>();
  @Output() dealUpdateRequested = new EventEmitter<DealStateData>();

  logConsole = true;
  offerOwnerStatus = 'offline';
  offerOwnerProfileIage = 'assets/images/sm-dp.jpg';
  selectedOfferDetails: DealInjectOffer;
  updateDealResponseObj: DealDetailsFormat;
  dealDetails: DealDetailsFormat;
  updateDealSnapshotObj: DealSnapshot;
  dealButton = 'REQUEST_TO_UPDATE_BUTTON';
  updateDealComment: string;
  dealUpdateReqSeent = false;
  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };

  constructor(private dealService: DealService, @Inject(MAT_DIALOG_DATA) public rejectData: any, public dialog: MatDialog) { }

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
      if (this.logConsole) { console.log('[DEAL] deatils: ', response); }
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
        offeredAmount: response.payload.offeredAmount || 0,
      };

      // checking deal status if already update req is sent
      if (this.updateDealResponseObj.dealStatus.dealStatus === 'UPDATE_REQUESTED') {
        this.dealButton = '';
        this.dealUpdateReqSeent = true;
      }
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

  getDealExpireIn(expireIn: string = ''): string {
    if (!expireIn) { return ''; }
    return expireIn.substr(0, 10);
  }

  acceptDeal(dealId) {
    this.dealAcceptStatus.emit({
      sourcePage: 'ACCEPT_DEAL',
      status: 'DEAL_ACCEPTED',
      dealId
    });
  }

  onUpdateComment(comment: string) {
    console.log('[DEAL] owner-receiver comment updated');
    this.updateDealComment = comment;
  }

  onDealUpdateRequest() {
    if (this.data.dealId) {
      const reqObj: DealUpdateReqFormat = {
        dealRefId: this.data.dealId,
        comments: this.updateDealComment
      };
      this.dealService.dealUpdateReq(reqObj)
        .subscribe((dealUpdateResponse: DealResponseHttp) => {
          console.log('[DEAL]', dealUpdateResponse);
          if (dealUpdateResponse && dealUpdateResponse.code === 200) {
            this.dealUpdateRequested.emit({
              sourcePage: 'VIEW_OFFER',
              status: 'DEAL_RECEIVED',
              dealId: this.data.dealId
            });
            // successful! we can close the dialog
            this.dialogClosed.emit({
              dealInitiated: false
            });
          }
        }, error => {
          if (error && error.error) {
            this.setErrorObject(error.error);
          }
        });
    }
  }

  rejectDeal(dealId) {
    const rejctDialog = this.dialog.open(DealRejectComponent, {
      data: {
        dealRefId: dealId
      }
    });

    rejctDialog.afterClosed().subscribe((result) => {
      console.log(`Reject dialog closed result: ${JSON.stringify(result)}`);
      if(result == 'reject'){
        this.onDialogClose();
      }
    });
  }
}
