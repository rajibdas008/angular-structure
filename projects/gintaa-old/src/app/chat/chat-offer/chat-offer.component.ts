import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OfferService } from '@gintaa/shared';
import { Offer } from '@gintaa/shared/modals';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-offer',
  templateUrl: './chat-offer.component.html',
  styleUrls: ['./chat-offer.component.scss']
})
export class ChatOfferComponent implements OnInit {

  loggedInUserOffers$: Observable<any[]>;
  selectedOffers = [];
  loggedInOffers = [];
  @ViewChild('offerMsg',{ static: false}) offerMsg: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<ChatOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private offerService: OfferService) { }

  ngOnInit() {
    this.loggedInUserOffers$ = this.offerService.getLoginUserPostedOffer()
    .pipe(
      map((offers: Offer[]) => { 
        let loggedInOffers = [];
        offers.map(offer => {
          let {name, description, quantity, offerId, offerType, images, itemCondition, unitOfferValuation, activeSince} = offer;
          loggedInOffers.push({
            name, 
            description, 
            quantity, 
            offerId, 
            offerType, 
            images: images[0], 
            itemCondition, 
            unitOfferValuation, 
            activeSince, 
            checked: false});
        });
        this.loggedInOffers = loggedInOffers;
        return loggedInOffers;
      })
      );      
  }

  closeDialog(): void {
    this.dialogRef.close({closeOfferPopUp: true});
  }

  selectedOffer(event: any, offer: any) {
      offer.checked = event.target.checked;
  }

  get selectedOffersLength() {
    const offers = this.loggedInOffers ? [...this.loggedInOffers.filter(offer => offer.checked === true)] : [];
    return offers.length;
  }

  sendSelectedOffers() {
    const offers = this.loggedInOffers ? [...this.loggedInOffers.filter(offer => offer.checked === true)] : [];
    const res = { status: true, offers, msg:  this.offerMsg.nativeElement.value };
    this.dialogRef.close(res);
  }

}
