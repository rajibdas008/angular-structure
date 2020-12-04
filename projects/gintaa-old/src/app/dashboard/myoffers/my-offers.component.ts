import { Component, OnInit } from '@angular/core';
import { CommonHttpService, SharedService } from '@gintaa/shared';
import { OfferStat } from '@gintaa/shared/modals';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-myoffers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {
 
  draftCount: number = 0;
  activeCount: number = 0;
  unPublishCount: number = 0;
  underReviewOffersCount: number = 0;
  rejectedOffersCount: number = 0;

  constructor(
    private httpService: CommonHttpService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.httpService.getOfferStat()
    .pipe(
      map(
        (response) => response.payload ? response.payload : null
      )
    ).subscribe(
      (result) => {
        if (result != null) {
          const offerStat = result as OfferStat;
          this.draftCount = offerStat.draftOfferCounts;
          //this.unPublishCount = offerStat.failedOfferCounts;
          this.activeCount = offerStat.publishedOfferCounts;
          this.underReviewOffersCount = offerStat.adminReviewPendingOfferCounts;
          this.rejectedOffersCount = offerStat.failedOfferCounts;
          this.sharedService.offerCountMessage.next(offerStat);
        }
      },
      (errorResponse) => { }
    );
  }
}
