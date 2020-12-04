import { Component, OnInit } from '@angular/core';
import { OfferService, SharedService } from '@gintaa/shared';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@gintaa/shared/modals';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewer-others-offers',
  templateUrl: './viewer-others-offers.component.html',
  styleUrls: ['./viewer-others-offers.component.scss']
})
export class ViewerOthersOffersComponent implements OnInit {

  offerUserName: string = null;
  userOtherOffers$:Observable<Offer[]>;

  constructor(
    public sharedService: SharedService,
    public offerService: OfferService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { offerDetail: Offer}) => {
       const offerDetails = data.offerDetail;
       this.offerUserName = offerDetails.user.name;
       this.userOtherOffers$ = this.offerService.getUserPostedOtherOffers(offerDetails.offerId);
     },
     (errorResponse) => { }
     );
  }

}
