import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

import { DealService } from '@gintaa/shared/services/deal.service';
import { Constants } from '@gintaa/constants';

@Component({
  selector: 'app-give-offers-slider',
  templateUrl: './give-offers-slider.component.html',
  styleUrls: ['./give-offers-slider.component.scss']
})
export class GiveOffersSliderComponent implements OnInit, OnDestroy {

  @Output() emittedOffers = new EventEmitter<any>();
  @Output() emitDialogClose = new EventEmitter<any>();

  logConsole = false;
  title = 'angularowlslider';
  modifiedOfferList = [];
  selectedOffers = [];
  updatedOfferQuantity = {
    offerUpdatedCount: 0,
    offerItemCount: 0,
    offerId: '',
    offerType: '',
    invalid: false,
    currentEvent: null
  };
  showItemQuantityBox = false;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 80,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    }
  };
  myoffersSubscription: Subscription;

  debugMode = false;
  populateOfferCount = Constants.DEAL_DEBUG_OFFER_SLIDER_COUNT;
  showSliderButtons = true;

  constructor(private dealService: DealService) {
  }

  ngOnInit() {
    this.myoffersSubscription = this.dealService.myOffersSubjectObserver$.subscribe((offers) => {
      this.modifiedOfferList = [...offers];

      if (this.debugMode) {
        while (this.populateOfferCount) {
          this.populateOfferCount = this.populateOfferCount - 1;
          this.modifiedOfferList.push(
            Constants.DEAL_DEBUG_OFFER_SLIDER_ITEM
          );
        }
      }
      if (this.modifiedOfferList && this.modifiedOfferList.length > 0) {
        this.checkForOfferChanges(this.modifiedOfferList);
      }

      if (this.modifiedOfferList.length <= Constants.DEAL_SHOW_OFFER_SLIDER_FOR_MIN_OFFER_COUNT) {
        this.showSliderButtons = false;
      }
    });
  }

  checkForOfferChanges(offers: any) {
    if (offers && offers.length > 0) {
      this.selectedOffers = [];

      offers.map((offer: any) => {
        if (offer.selected) {
          this.selectedOffers.push({
            offerId: offer.offerId,
            offerItemCount: offer.selectedCount,
            offerType: offer.offerType
          });
        }
      });
      this.emittedOffers.emit(this.selectedOffers);
    }
  }

  getPassedData(event) {}

  chooseItemQuantity(e: any, offerId: string, offerItemCount: number, offerType: string) {
    if (e.target.checked) {
      this.updatedOfferQuantity = {
        ...this.updatedOfferQuantity,
        offerUpdatedCount: offerItemCount,
        offerItemCount,
        offerId,
        offerType,
        currentEvent: e,
      };
      if (offerType !== 'Service') {
        this.showItemQuantityBox = true;
      } else {
        this.updateSelectedOffers(offerId, 0, offerType);
      }
    } else {
      // this.updateSelectedOffers(offerId, offerItemCount, offerType);
      this.selectedOffers = this.removeByOfferId(this.selectedOffers, 'offerId', offerId);
    }
  }

  updateSelectedOffers(offerId: string, offerItemCount: number, offerType: string) {
    if (this.selectedOffers.some(offer => offer.offerId === offerId)) {
      this.selectedOffers = this.removeByOfferId(this.selectedOffers, 'offerId', offerId);
    } else {
      this.selectedOffers.push({
        offerId,
        offerItemCount,
        offerType
      });
    }
    this.emittedOffers.emit(this.selectedOffers);
  }

  removeByOfferId(arr: Array<any>, attr: string, value: string) {
    // if (this.logConsole) { console.log('offer id: ', value, 'exists. removing'); }
    let i = arr.length;
    while ( i--
      && arr[i].hasOwnProperty(attr)
      && ( arguments.length > 2 && arr[i][attr] === value)) {
      if (arr[i]) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  nQuantityChange() {
    if (this.updatedOfferQuantity.offerUpdatedCount > 0 &&
      (this.updatedOfferQuantity.offerUpdatedCount <= this.updatedOfferQuantity.offerItemCount)) {
      this.updatedOfferQuantity.invalid = false;
    } else {
      this.updatedOfferQuantity.invalid = true;
    }
  }

  modifyOfferQuantity() {
    if (this.updatedOfferQuantity.offerUpdatedCount > 0 &&
      (this.updatedOfferQuantity.offerUpdatedCount <= this.updatedOfferQuantity.offerItemCount)) {
        this.updatedOfferQuantity.invalid = false;
        this.showItemQuantityBox = false;
        this.updateSelectedOffers(
          this.updatedOfferQuantity.offerId,
          this.updatedOfferQuantity.offerUpdatedCount,
          this.updatedOfferQuantity.offerType
        );
    } else {
      this.updatedOfferQuantity.invalid = true;
    }
  }

  onCloseQuantityPopup() {
    this.showItemQuantityBox = false;

    // uncheck the checkbox
    if (this.updatedOfferQuantity.currentEvent) {
      this.updatedOfferQuantity.currentEvent.target.checked = false;
    }
  }

  onDialogClose() {
    this.emitDialogClose.emit();
  }

  ngOnDestroy() {
    if (this.myoffersSubscription) {
      this.myoffersSubscription.unsubscribe();
    }
  }

}
