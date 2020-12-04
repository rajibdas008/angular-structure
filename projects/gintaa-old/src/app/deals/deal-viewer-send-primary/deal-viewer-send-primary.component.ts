import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import {
  InjectDialogData, DealInjectOffer,
  InitiateDealRequestObject, DealResponseErrorObj, DealStateData,
  DealDetailsFormat,
  CurrentLocation
} from '@gintaa/shared/modals';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DealService } from '@gintaa/shared/services/deal.service';
import { CommonHttpService } from '@gintaa/shared/services/common-http.service';
import { ChatService, LocationService, LoggerService } from '@gintaa/shared';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { JunctionsMeetComponent } from '../junctions-meet/junctions-meet.component';

import Moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-deal-viewer-send-primary',
  templateUrl: './deal-viewer-send-primary.component.html',
  styleUrls: ['./deal-viewer-send-primary.component.scss'],
})
export class DealViewerSendPrimaryComponent implements OnInit {

  @Output() dialogClosed = new EventEmitter<{ dealInitiated: boolean }>();
  @Output() initiateDealSuccess = new EventEmitter<DealStateData>();
  @Input() data: InjectDialogData;
  @ViewChild('receiverGiveMoneyInput', { static: false }) receiverGiveMoneyInput: ElementRef;
  @ViewChild('senderGiveMoneyInput', { static: false }) senderGiveMoneyInput: ElementRef;

  selectedOfferDetails: DealInjectOffer;
  siblingOfferDetails: DealInjectOffer[] = [];
  logConsole = true;
  offerOwnerStatus = 'offline';
  offerOwnerProfileIage = 'assets/images/no-image.svg';
  dealDefaultImage = 'assets/images/no-image.svg';
  senderGiveMoneyAmount = null;
  reciverGiveMoneyAmount = null;
  showAllReceiverOffers = false;
  dealButtonState: string;
  minMatDate: string;
  requestObject = {
    amountCurrency: 'INR',
    dealRefNo: '',
    sender: {
      selectedOffers: [],
      giveMoney: false,
      amount: 0,
    },
    receiver: {
      selectedOffers: [],
      selected: false,
      giveMoney: false,
      amount: 0,
      selectedOffersTemp: [],
    },
    comments: '',
    defaultDeliveryOption: {
      doorStepDelivery: false,
      selfPickup: false,
      dropToGintaaJunction: false,
    },
    includeShipping: true,
    includeInsurance: false,
    expiryDate: '',
    gintaaJunctionId: null,
    meetingDate: '',
    meetingStartTime: '9:00:00',
    meetingEndTime: '6:00:00',
    dropToGintaaJunction: false,
    gintaaJunctions: []
  };
  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };
  updatedOfferQuantity = {
    offerUpdatedCount: 0,
    offerItemCount: 0,
    offerId: '',
    offerType: '',
    invalid: false,
    currentEvent: null,
  };
  showItemQuantityBox = false;
  validateOfferQuantity = true;
  savedReceiverCheckboxEvent: any = null;
  userCurrentLocationReceived: CurrentLocation = {
    available: false,
    _lat: '',
    _lng: '',
  };

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
        this.selectedOfferDetails.image = this.dealDefaultImage;
      }
      this.requestObject.receiver.selected = true;
      this.requestObject.receiver.selectedOffers.push({
        offerId: this.data.currentOffer.offerId,
        offerItemCount: (this.data.currentOffer.quantity) ? this.data.currentOffer.quantity : 0,
        offerType: this.data.currentOffer.offerType
      });
      // disable offer quantity validation for service offers
      if (this.data.currentOffer.offerType === 'Service') {
        this.validateOfferQuantity = false;
      }
    }
    // check if we are coming from update deal page
    if (this.data.dealId) {
      this.logger.log({
        moduleName: 'INITIATE_DEAL',
        message: `dealId detected :: ' ${this.data.dealId}`,
      });
      this.requestObject.dealRefNo = this.data.dealId;
      this.dealService.getDealDetails(this.requestObject.dealRefNo)
        .subscribe((dealDetails: any) => {
          if (dealDetails) {
            this.updateRequestObject({...dealDetails.payload});
          }
        }, error => {
          // failing silently for now with just a log
          this.logger.log({
            moduleName: 'INITIATE_DEAL',
            message: 'Unable to fetch deal details',
            logType: 'warn'
          });
        });
    } else {
      this.dealService.myOffersSubject$.next(this.data.myOffers);
    }

    // set deal button state
    if (this.data.dealId) {
      this.dealButtonState = 'UPDATE_DEAL_BUTTON';
    } else {
      this.dealButtonState = 'INITIATE_DEAL_BUTTON';
    }
  }

  updateRequestObject(dealDetails: DealDetailsFormat) {
    // setting request amout
    if (dealDetails.requestedAmount > 0) {
      this.requestObject.sender.giveMoney = true;
      this.requestObject.sender.amount = dealDetails.requestedAmount;
      this.senderGiveMoneyAmount = dealDetails.requestedAmount;
    } else {
      this.requestObject.sender.giveMoney = false;
      this.requestObject.sender.amount = 0;
      this.senderGiveMoneyAmount = 0;
    }

    // we need to clear the selected flag
    this.data.myOffers.map((offer, index) => {
      this.data.myOffers[index].selected = false;
      this.data.myOffers[index].selectedCount = 0;
    });

    // setting up my selected offers
    if (dealDetails.offeredOffers && dealDetails.offeredOffers.length > 0) {

      // we need to update the properties
      dealDetails.offeredOffers.map((selectedOffer) => {
        if (selectedOffer) {
          const selectedOfferId = selectedOffer.offerId;
          const selectedOfferCount = (selectedOffer.offerCount) ? selectedOffer.offerCount : 0;
          this.data.myOffers.map((offer, index) => {
            if (offer.offerId === selectedOfferId) {
              this.data.myOffers[index].selected = true;
              this.data.myOffers[index].selectedCount = selectedOfferCount;
            }
          });
        }
      });

      this.dealService.myOffersSubject$.next(this.data.myOffers);
    }

    // console.log('[DEAL INITIATE] selected offers', this.data.myOffers);

    // setting delivery option
    if (dealDetails.includeShipping) {
      this.requestObject.defaultDeliveryOption = {
        doorStepDelivery: true,
        selfPickup: false,
        dropToGintaaJunction: false,
      };
      this.requestObject.includeShipping = true;
    }

    // setting up insure deal
    if (dealDetails.includeInsurance) {
      this.requestObject.includeInsurance = true;
    }

    // seting up requestedOffers
    if (dealDetails.requestedOffers) {
      this.requestObject.receiver.selectedOffers = [];
      dealDetails.requestedOffers.map((offer) => {
        const selectedIage = (offer.images.length > 0) ? offer.images[0].url : this.dealDefaultImage;
        this.selectedOfferDetails = {
          offerId: offer.offerId,
          offerType: offer.offerType,
          quantity: offer.offerCount,
          name: offer.offerName,
          image: selectedIage,
          description: offer.offerName
        };

        // if (this.logConsole) { console.log('[DEAL SEND PRIMARY] --> pushing', offer.offerId); }
        this.requestObject.receiver.selectedOffers.push({
          offerId: offer.offerId,
          offerItemCount: offer.offerCount,
          offerType: offer.offerType
        });
      });
    }

    // setting up receiver profile image
    if (dealDetails.receiver && dealDetails.receiver.name) {
      this.data.user.name = dealDetails.receiver.name;
    }
    if (dealDetails.receiver && dealDetails.receiver.imageUrl) {
      this.offerOwnerProfileIage = dealDetails.receiver.imageUrl;
    }

    // setting up the junction details
    if (dealDetails.dropToGintaaJunction) {
      this.requestObject.gintaaJunctionId = dealDetails.junctionView ? dealDetails.junctionView.id : null;
      this.requestObject.dropToGintaaJunction = true;
      this.requestObject.meetingDate = dealDetails.meetingDate;
      this.requestObject.meetingStartTime = dealDetails.meetingStartTime;
      this.requestObject.meetingEndTime = dealDetails.meetingEndTime;


      this.requestObject.defaultDeliveryOption.dropToGintaaJunction = true;
      this.requestObject.defaultDeliveryOption.doorStepDelivery = false;
      this.requestObject.defaultDeliveryOption.selfPickup = false;
      this.requestObject.includeShipping = false;
    }

    // TODO
    // setup the expiry date
    // fill out the comment
  }

  constructor(
    private dealService: DealService,
    private locationService: LocationService,
    private commonHttpService: CommonHttpService,
    public matDialog: MatDialog,
    private logger: LoggerService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.setInitialDetails();
    this.fillIntialExpiryDate();
    this.setCurrentUserLocation();
  }

  setCurrentUserLocation() {
    this.locationService.getPosition().then(res => {
      // if (this.logConsole) {console.log('[DEAL Current Location]', res); }
      if (res.lat && res.lng) {
        this.userCurrentLocationReceived = {
          available: true,
          _lat: res.lat,
          _lng: res.lng,
        };
      }
    });
  }

  fillIntialExpiryDate() {
    this.dealService.getDealsExpiryDate().subscribe((res: any) => {
      if (res.code === 200 && res.payload) {
        const expiryDate = res.payload.expiryDate.toString().substr(0, 10);
        this.requestObject.expiryDate = expiryDate;
        this.minMatDate = expiryDate;
        this.logger.log({
          moduleName: 'INITIATE_DEAL',
          message: `updated expiry date: ' ${expiryDate}`,
        });
      } else {
        // error! going with default approach
        const currentdate = new Date();
        this.requestObject.expiryDate = `${currentdate.getMonth() + 1}-${currentdate.getDate()}-${currentdate.getFullYear()}`;
        this.minMatDate = `${currentdate.getMonth() + 1}-${currentdate.getDate()}-${currentdate.getFullYear()}`;
      }
    });
  }

  openGintaaJunctionsModal() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'jintaa-junctions';
    dialogConfig.position = {
      top: '0px',
      right: '0px',
    };
    dialogConfig.height = 'auto';
    dialogConfig.width = '1170px';
    dialogConfig.data = {
      location: { ...this.userCurrentLocationReceived },
      offerOwnerName: this.data.user.name,
    };

    const modalDialog = this.matDialog.open(JunctionsMeetComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // update the selected junction ID
      if (results.selectedGintaaJunction) {
        this.requestObject.gintaaJunctionId = results.selectedGintaaJunction;

        // reset the delivery option - unselect others
        this.requestObject.defaultDeliveryOption.dropToGintaaJunction = true;
        this.requestObject.defaultDeliveryOption.doorStepDelivery = false;
        this.requestObject.defaultDeliveryOption.selfPickup = false;
        this.requestObject.includeShipping = false;
        this.requestObject.dropToGintaaJunction = true;
      } else {
        // uncheck the delivery checkbox if closed my modal close
        // only if this is not the update page
        if (!this.data.dealId) {
          this.requestObject.defaultDeliveryOption.dropToGintaaJunction = false;
        }
      }

      // update the meeting date time
      // TODO - remove meetingEndTime altogether
      if (results.meetingDateTime) {
        const meetDate = new Date(results.meetingDateTime);

        // tslint:disable-next-line: max-line-length
        this.requestObject.meetingDate = `${meetDate.getFullYear()}-${(meetDate.getMonth() + 1).toString().padStart(2, '0')}-${meetDate.getDate().toString().padStart(2, '0')}`;
        // tslint:disable-next-line: max-line-length
        this.requestObject.meetingStartTime = `${meetDate.getHours()}:${meetDate.getMinutes().toString().padStart(2, '0')}:${meetDate.getSeconds().toString().padStart(2, '0')}`;
        this.requestObject.meetingEndTime = '05:00';

        this.logger.log({
          moduleName: 'INITIATE_DEAL',
          message: `set meeting time: ' ${this.requestObject.meetingDate} - ${this.requestObject.meetingStartTime}`,
        });
      }
    });
  }

  onEmittedOffers(offers: Array<string | number>) {
    // console.log('[resetting my selected offers]', offers);
    this.resetErrorObject();
    this.requestObject.sender.selectedOffers = offers;
  }

  onChangeGiveMoney(e: any, type: string = 'sender', ...extraParams: any) {
    // new requirement >> Make the amount null again if uncheched
    let skipMouseEvent = false;
    this.resetErrorObject();
    if (extraParams.length) {
      skipMouseEvent = extraParams[0];
    }

    if (type === 'receiver') {
      this.requestObject.receiver.giveMoney = !this.requestObject.receiver.giveMoney;
      if ((e && e.target.checked) || skipMouseEvent) {
        this.requestObject.sender.giveMoney = false;
        this.senderGiveMoneyAmount = null;
      } else {
        this.reciverGiveMoneyAmount = null;
      }
      if (this.requestObject.receiver.giveMoney) {
        this.requestObject.receiver.amount = this.reciverGiveMoneyAmount;
      } else {
        this.requestObject.receiver.amount = 0;
      }
    } else {
      this.requestObject.sender.giveMoney = !this.requestObject.sender.giveMoney;
      if ((e && e.target.checked) || skipMouseEvent) {
        this.requestObject.receiver.giveMoney = false;
        this.reciverGiveMoneyAmount = null;
      } else {
        this.senderGiveMoneyAmount = null;
      }

      if (this.requestObject.sender.giveMoney) {
        this.requestObject.sender.amount = this.senderGiveMoneyAmount;
      } else {
        this.requestObject.sender.amount = 0;
      }
    }
  }

  toggleInputState(type: string = 'sender') {
    if (!this.requestObject[type].giveMoney) {
      this.onChangeGiveMoney(null, type, true);
    }

    // this is why angular sucks!! :(
    setTimeout(() => {
      if (type === 'sender') {
        this.senderGiveMoneyInput.nativeElement.focus();
      } else {
        this.receiverGiveMoneyInput.nativeElement.focus();
      }
    }, 0);
  }

  onChangeMatchedOffer(e: any) {
    this.savedReceiverCheckboxEvent = e;
    this.requestObject.receiver.selected = !this.requestObject.receiver.selected;
    if (e.target.checked) {
      // do nothing for now
      // if (this.logConsole) { console.log('[checkbox]', e); }
    } else {
      // trigger mat-toggle
      this.showAllSiblingOffers('sender');
    }
  }

  onChangeMatchedOfferToggle($event: MatSlideToggleChange, type: string = 'sender') {
    if ($event.checked) {
      // if (this.logConsole) { console.log('[MatToggle] checked'); }
      this.showAllReceiverOffers = false;

      // if (this.logConsole) { console.log('[MatToggle]', this.savedReceiverCheckboxEvent); }
      if (this.savedReceiverCheckboxEvent) {
        this.savedReceiverCheckboxEvent.target.checked = true;
        this.requestObject.receiver.selected = true;
      }

      // we might switched the mat-toggle. in that case just get the selected from temp
      this.requestObject.receiver.selectedOffers = [];
      this.requestObject.receiver.selectedOffers = [...this.requestObject.receiver.selectedOffersTemp];
      this.requestObject.receiver.selectedOffersTemp = [];
    } else {
      // select the deafult offer again
      // if (this.logConsole) { console.log('[MatToggle] un checked'); }
      this.showAllSiblingOffers(type);
    }
  }

  showAllSiblingOffers(type: string = 'sender') {
    this.showAllReceiverOffers = true;

    // making selected offers blank and taking a backup
    this.requestObject.receiver.selectedOffersTemp = [];
    this.requestObject.receiver.selectedOffersTemp = [...this.requestObject.receiver.selectedOffers];
    this.requestObject.receiver.selectedOffers = [];

    // get all offers by the user
    this.commonHttpService.userOtherPostedOffers(this.selectedOfferDetails.offerId)
      .subscribe((siblingOffersResponse: any) => {
        // if (this.logConsole) { console.log('[DEAL] sibling offers', siblingOffersResponse); }
        if (siblingOffersResponse.payload && siblingOffersResponse.payload.Item) {
          this.siblingOfferDetails = [];
          // push available offer items
          // if quantity is 0, no need to show them
          siblingOffersResponse.payload.Item.map((offer: any) => {
            if (offer.quantity > 0) {
              this.siblingOfferDetails.push({
                offerId: offer.offerId,
                offerType: offer.offerType,
                quantity: offer.quantity,
                description: offer.description,
                name: offer.name,
                image: (offer.images.length > 0) ? offer.images[0].url : this.dealDefaultImage,
              });
            }
          });

          // push available offer services
          if (siblingOffersResponse.payload.Service) {
            siblingOffersResponse.payload.Service.map((offer: any) => {
              this.siblingOfferDetails.push({
                offerId: offer.offerId,
                offerType: offer.offerType,
                quantity: 0,
                description: offer.description,
                name: offer.name,
                image: (offer.images.length > 0) ? offer.images[0].url : this.dealDefaultImage,
              });
            });
          }
        }
      }, error => {
        // error! silently failing
      });
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

  onQuantityChange() {
    if (this.updatedOfferQuantity.offerUpdatedCount > 0 &&
      (this.updatedOfferQuantity.offerUpdatedCount <= this.updatedOfferQuantity.offerItemCount)) {
      this.updatedOfferQuantity.invalid = false;
    } else {
      this.updatedOfferQuantity.invalid = true;
    }
  }

  updateSelectedOffers(offerId: string, offerItemCount: number, offerType: string) {
    if (this.requestObject.receiver.selectedOffers.some(offer => offer.offerId === offerId)) {
      this.requestObject.receiver.selectedOffers = this.removeByOfferId(
        this.requestObject.receiver.selectedOffers,
        'offerId',
        offerId
      );
    } else {
      this.requestObject.receiver.selectedOffers.push({
        offerId,
        offerItemCount,
        offerType
      });
    }
  }

  onChooseReceiverOffer(e: any, offerId: string, offerItemCount: number, offerType: string) {
    if (offerId) {
      if (e.target.checked) {
        // if checked show the choose quantitybox
        // if (this.logConsole) { console.log('[DEAL] choose receiver offer - ', offerId, offerItemCount, offerType); }
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
        // check and either push or remove
        this.updateSelectedOffers(offerId, offerItemCount, offerType);
      }
    }
  }

  modifyOfferQuantity() {
    // if (this.logConsole) { console.log('[DEAL] modified receiver offer'); }
    if (this.updatedOfferQuantity.offerUpdatedCount > 0 &&
      (this.updatedOfferQuantity.offerUpdatedCount <= this.updatedOfferQuantity.offerItemCount)) {
        // if (this.logConsole) { console.log('[DEAL] modified value is valid'); }
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

  modifyDeliveryOption(e: any, deliveryOption: string) {
    const current = this.requestObject.defaultDeliveryOption[deliveryOption];
    this.requestObject.dropToGintaaJunction = false;
    this.requestObject.gintaaJunctionId = null;
    this.requestObject.defaultDeliveryOption = {
      doorStepDelivery: false,
      selfPickup: false,
      dropToGintaaJunction: false,
    };
    this.requestObject.defaultDeliveryOption[deliveryOption] = !current;
    if (deliveryOption === 'doorStepDelivery') {
      this.requestObject.includeShipping = !this.requestObject.includeShipping;
    } else if (deliveryOption === 'selfPickup') {
      this.requestObject.includeShipping = false;
    }
  }

  setDealExpiryDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.requestObject.expiryDate = Moment(event.value).format('YYYY-MM-DD');
      // if (this.logConsole) { console.log('updated expiry date: ', this.requestObject.expiryDate); }
    }
  }

  onSetUpdatedComment(message: string) {
    this.requestObject.comments = message;
  }

  onSubmitDeal() {
    this.requestObject.receiver.amount = this.reciverGiveMoneyAmount;
    this.requestObject.sender.amount = this.senderGiveMoneyAmount;

    this.logger.log({
      moduleName: 'INITIATE_DEAL',
      messageObj: this.requestObject,
    });

    // validations #1
    if (this.requestObject.sender.selectedOffers.length === 0
        && (this.requestObject.sender.amount <= 0)) {
      this.setErrorObject({
        showError: true,
        code: 404,
        message: 'Please choose any offer or give money',
        success: false,
      });
      return false;
    }

    // validations #2
    if (this.requestObject.receiver.selectedOffers.length === 0) {
      this.setErrorObject({
        showError: true,
        code: 404,
        message: 'Please select the offer you like',
        success: false,
      });
      return false;
    }

    // validation #3
    if (this.requestObject.receiver.selectedOffers.length > 0) {
      const invalidQuantity = this.requestObject.receiver.selectedOffers.every(offer => offer.offerItemCount && offer.offerItemCount > 0);

      if (!invalidQuantity && this.validateOfferQuantity) {
        this.setErrorObject({
          showError: true,
          code: 404,
          message: 'Choose offer quantity is Invalid! Choose other offers',
          success: false,
        });
        return false;
      }
    }

    // validation #4
    if (this.requestObject.sender.selectedOffers.length > 0) {
      const invalidQuantity = this.requestObject.sender.selectedOffers.some(offer => offer.offerItemCount && offer.offerItemCount > 0);

      if (!invalidQuantity && this.validateOfferQuantity) {
        this.setErrorObject({
          showError: true,
          code: 404,
          message: 'Given offer quantity is Invalid! Choose other offers',
          success: false,
        });
        return false;
      }
    }

    // validation #5
    if (
        (this.requestObject.sender.giveMoney && this.requestObject.sender.amount < 0)
        ||
        (this.requestObject.receiver.giveMoney && this.requestObject.receiver.amount < 0)
      ) {
      this.setErrorObject({
        showError: true,
        code: 404,
        message: 'Given amount cannot be less that zero',
        success: false,
      });
      return false;
    }

    // validation #6
    if (this.requestObject.dropToGintaaJunction) {
      if (!this.requestObject.gintaaJunctionId) {
        this.setErrorObject({
          showError: true,
          code: 404,
          message: 'Please choose a valid Gintaa Junction',
          success: false,
        });
        return false;
      }

      if (!this.requestObject.meetingDate) {
        this.setErrorObject({
          showError: true,
          code: 404,
          message: 'Please set a valid meeting date',
          success: false,
        });
        return false;
      }
    }

    const initiateDealRequestObject: InitiateDealRequestObject = {
      amountCurrency: this.requestObject.amountCurrency,
      comments: this.requestObject.comments,
      destinationOfferDetails: this.requestObject.receiver.selectedOffers,
      dropToGintaaJunction: this.requestObject.dropToGintaaJunction,
      includeInsurance: this.requestObject.includeInsurance,
      includeShipping: this.requestObject.includeShipping,
      sourceOfferDetails: this.requestObject.sender.selectedOffers
    };

    initiateDealRequestObject.expiryDate = this.formatDate(this.requestObject.expiryDate);

    // if request coming from update page, we need to attach the deal id
    if (this.requestObject.dealRefNo) {
      // if (this.logConsole) { console.log('[INITIATE DEAL] attached dealRefNo'); }
      initiateDealRequestObject.dealRefNo = this.requestObject.dealRefNo;
    }

    // if no amount is given, no need to set the field
    if (this.requestObject.sender.giveMoney) {
      initiateDealRequestObject.requestedAmount = this.requestObject.sender.amount;
    }

    // setup the jintaa junction details
    if (this.requestObject.dropToGintaaJunction) {
      initiateDealRequestObject.gintaaJunctionId = `${this.requestObject.gintaaJunctionId}`;
      initiateDealRequestObject.meetingDate = `${this.formatDate(this.requestObject.meetingDate)}`;
      initiateDealRequestObject.meetingEndTime = `${this.requestObject.meetingEndTime}`;
      initiateDealRequestObject.meetingStartTime = `${this.requestObject.meetingStartTime}`;
    }

    if (this.logConsole) {
      this.logger.log({
        moduleName: 'INITIATE_DEAL',
        message: 'feeding request object',
        messageObj: initiateDealRequestObject,
      });
    }

    // if request coming from update page, we need to call /update otherwise call /initiate
    if (this.requestObject.dealRefNo) {
      this.dealService.updateDeal(initiateDealRequestObject).subscribe((initiateDealResponse: any) => {
        this.processDealSuccess(initiateDealResponse, 'UPDATE');
      }, error => {
        this.setErrorObject(error.error);
      });
    } else {
      this.dealService.initiateDeal(initiateDealRequestObject).subscribe((initiateDealResponse: any) => {
        this.processDealSuccess(initiateDealResponse, 'INITIATE');
      }, error => {
        this.setErrorObject(error.error);
      });
    }
  }

  processDealSuccess(dealResponse: any, from: string = 'INITIATE') {
    // console.log('[DEAL INTIATE] ---> ', from, dealResponse);
    if (dealResponse.body && dealResponse.body.code === 200) {
      const dealId = dealResponse.body.payload.dealReferenceId;
      this.requestObject.dealRefNo = dealId;
      this.onSubmitDealSuccess(dealId);
      const message = 'initiate deal';
      this.chatService.sendMessage(message, 'DEAL');
    } else {
      this.setErrorObject({
        code: 500,
        message: 'Internal Server Error',
        showError: true,
        success: false
      });
    }
  }

  setErrorObject(error: DealResponseErrorObj) {
    let errorMsg = error.message;
    if (!error.message) {
      if (error.payload[0]) {
        errorMsg = error.payload[0].errorDetailedReason;
      } else if (error.payload.errorDetailedReason) {
        errorMsg = error.payload.errorDetailedReason;
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

  formatDate(date: string) {
    return date.replace(/-/g, '');
  }

  onCloseQuantityPopup() {
    this.showItemQuantityBox = false;

    // uncheck the checkbox
    // if (this.logConsole) { console.log('[Quantity Box] :: unchecked'); }
    if (this.updatedOfferQuantity.currentEvent) {
      this.updatedOfferQuantity.currentEvent.target.checked = false;
    }
  }

  onSubmitDealSuccess(dealId: string) {
    this.initiateDealSuccess.emit({
      sourcePage: 'INITIATE_DEAL',
      status: 'DEAL_CREATED',
      dealId
    });
  }

  onDialogClose() {
    this.dialogClosed.emit({
      dealInitiated: false
    });
  }

}
