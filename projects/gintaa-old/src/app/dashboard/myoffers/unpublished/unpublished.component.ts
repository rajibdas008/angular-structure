import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@gintaa/constants';
import { OfferService } from '@gintaa/shared';
import { Offer } from '@gintaa/shared/modals';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unpublished',
  templateUrl: './unpublished.component.html',
  styleUrls: ['./unpublished.component.scss']
})
export class UnpublishedComponent implements OnInit {

  underReviewOffers$: Observable<Offer[]>;
  pageIndex: number = 1;
  pageSize:number = Constants.PAGE_SIZE;
  state: string = 'under_review';

  constructor(
    public offerService: OfferService,
    private router: Router,
    config: NgbCarouselConfig,
  ) {
      {
        config.interval = 10000;
        config.wrap = false;
        config.keyboard = false;
        config.pauseOnHover = false;
      }
   }

  ngOnInit() {
    this.underReviewOffers$ = this.getUnderReviewOffer();
  }

  getUnderReviewOffer(): Observable<Offer[]> {
    const params: string = `?state=${this.state}&page=${this.pageIndex}&size=${this.pageSize}`;
    return this.offerService.getLoginUserPostedOffer(params);
  }     

  loadMoreOfferItems(): void {
    this.pageIndex +=1;
    this.underReviewOffers$ = this.getUnderReviewOffer();
  }

  offerDetail(item: any) {
    this.router.navigate(['/offer-details', 'view', item.offerId]);
  }
}
