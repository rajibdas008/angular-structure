import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '@gintaa/shared';
import { OfferDealStat, OfferStat } from '@gintaa/shared/modals';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit {

  draftCount = 0;
  activeCount = 0;
  unPublishCount = 0;
  underReviewOffersCount = 0;
  rejectedOffersCount = 0;
  ongoingOffers = 0;
  pageContentLoaded = false;

  constructor(private httpService: CommonHttpService) { }

  ngOnInit() {
    this.getOffersCounts();
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
          this.activeCount = offerStat.publishedOfferCounts;
          this.underReviewOffersCount = offerStat.adminReviewPendingOfferCounts;
          this.rejectedOffersCount = offerStat.failedOfferCounts;
        }
        this.pageContentLoaded = true;
      },
      (errorResponse) => { }
    );
  }

  getOffersCounts() {
    this.httpService.getDealStat()
    .pipe(
      map(
        (response) => response.payload ? response.payload : null
      )
    ).subscribe(
      (dealCount: OfferDealStat) => {
        this.ongoingOffers = dealCount.onGoingReceivedOffers + dealCount.onGoingSentOffers;
      },
      (error: any) => {}
    );
  }

}
