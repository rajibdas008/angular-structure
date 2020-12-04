import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';

import {
  Offer,
  DealStateData, DealDialogState, DealCurrentUserInfo, InjectDialogData
} from '@gintaa/shared/modals';
import { OfferService } from '@gintaa/shared/services/offer.service';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  logConsole = false;
  pageSource = 'VIEW_OFFER';
  dealStatus = '';
  dealId = '';
  currentOfferDetails: Offer;
  injectDialogData: InjectDialogData;
  currentUserinfo: DealCurrentUserInfo;
  defaultImageUrl: 'assets/images/no-image.svg';

  setDealState(dealState: DealStateData): void {
    const { sourcePage, status, dealId = '' } = dealState;
    this.pageSource = sourcePage;
    this.dealStatus = status;
    if (dealId && this.injectDialogData) {
      this.injectDialogData.dealId = dealId;
    }
  }

  initiateInjectDialogData() {
    this.injectDialogData = {
      user: {
        name: '',
        image: '',
        id: '',
        isOnline: false
      },
      myOffers: [],
      currentOffer: {
        offerId: '',
        quantity: 1,
        offerType: '',
        name: '',
        image: '',
        description: ''
      },
      dealId: this.dealId,
    };
  }

  setCurrentOfferDetails(data: Offer) {
    this.currentOfferDetails = data;
    this.injectDialogData = {
      ...this.injectDialogData,
      currentOffer: {
        offerId: data ? data.offerId : null,
        quantity: data ? data.quantity : 0,
        offerType: data ? data.offerType : '',
        name: data ? data.name : '',
        image: (data && data.images[0]) ? data.images[0].url : this.defaultImageUrl,
        description: data ? data.description : ''
      },
      user: {
        name: `${this.currentOfferDetails.user.name}`,
        image: '',
        id: this.currentOfferDetails.user.profileId,
        isOnline: false
      }
    };
  }

  constructor(
    public dialogRef: MatDialogRef<DealComponent>,
    @Inject(MAT_DIALOG_DATA) public dealStateFromDialog: DealStateData,
    private offerService: OfferService,
    private sharedService: SharedService,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    // checking if we have dealId from MAT_DIALOG_DATA
    if (dealStateFromDialog.dealId) {
      this.dealId = dealStateFromDialog.dealId;
    }

    this.setDealState(dealStateFromDialog);
    this.initiateInjectDialogData();
    if (isPlatformBrowser(this.platformId)) {
      const name = localStorage.getItem('username') || '';
      const image = localStorage.getItem('profileUrl') || undefined;
      this.currentUserinfo = {
        name, image, id: null, isOnline: false
      };
    }
  }

  ngOnInit() {
    // getting current offer details
    this.sharedService.offerDetailsFetched.subscribe((offerDetails: Offer) => {
      if (offerDetails) {
        this.setCurrentOfferDetails(offerDetails);
      }
    });

    // we need all the offers created by the current user
    this.offerService.getLoginUserPostedOffer()
      .subscribe(response => {
        if (this.logConsole) { console.log('Getting available offers --> ', response); }
        response.map(offer => {
          const offerImage = (offer.images[0]) ? offer.images[0].url : this.defaultImageUrl;
          this.injectDialogData.myOffers.push({
            offerId: offer.offerId,
            quantity: offer.quantity,
            offerType: offer.offerType,
            name: offer.name,
            image: offerImage,
            description: offer.description,
            selected: false,
            selectedCount: 0
          });
        });
      });
  }

  onHideDialog(dealDialogState: DealDialogState): void {
    this.dialogRef.close('closed');
  }

  onInitiateDealSuccess({sourcePage, status, dealId}: DealStateData): void {
    this.dealStatus = status;
    this.pageSource = sourcePage;
    this.injectDialogData.dealId = dealId;
  }

  onUpdateDealSuccess({sourcePage, status, dealId}: DealStateData): void {
    this.dealStatus = status;
    this.pageSource = sourcePage;
    this.injectDialogData.dealId = dealId;
  }

  onAcceptDealStatus({sourcePage, status, dealId}: DealStateData): void {
    this.dealStatus = status;
    this.pageSource = sourcePage;
    this.injectDialogData.dealId = dealId;
  }

  onDealConfirmStatus({sourcePage, status, dealId}: DealStateData): void {
    this.dealStatus = status;
    this.pageSource = sourcePage;
    this.injectDialogData.dealId = dealId;
  }

  onDealUpdateRequested({sourcePage, status, dealId}: DealStateData): void {
    this.dealStatus = status;
    this.pageSource = sourcePage;
    this.injectDialogData.dealId = dealId;
  }

  onDealConfirmationInitiated({sourcePage, status, dealId}: DealStateData): void {
    this.dealStatus = status;
    this.pageSource = sourcePage;
    this.injectDialogData.dealId = dealId;
  }

  onShowUserRating({sourcePage, status, dealId}: DealStateData): void {
    this.dealStatus = status;
    this.pageSource = sourcePage;
    this.injectDialogData.dealId = dealId;
  }

}
