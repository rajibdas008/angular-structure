import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@gintaa/shared/modals';
import { Observable } from 'rxjs';
import { OfferService } from '@gintaa/shared/services/offer.service';

@Component({
  selector: 'app-owner-others-offers',
  templateUrl: './owner-others-offers.component.html',
  styleUrls: ['./owner-others-offers.component.scss']
})
export class OwnerOthersOffersComponent implements OnInit {

  offerUserName: string = null;
  ownerOtherOffers$:Observable<Offer[]>;

  constructor(
    private route: ActivatedRoute,
    public offerService: OfferService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { offerDetail: Offer}) => {
      const offerDetails = data.offerDetail;
      //this.offerUserName = offerDetails.user.fName;
      this.ownerOtherOffers$ = this.offerService.getUserPostedOtherOffers(offerDetails.offerId);
    },
    (errorResponse) => { }
    );
  }

}
