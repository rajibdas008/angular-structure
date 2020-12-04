import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@gintaa/constants';
import { OfferService } from '@gintaa/shared';
import { Offer } from '@gintaa/shared/modals';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss']
})
export class RejectedComponent implements OnInit {

  rejectedOffers$: Observable<Offer[]>;
  pageIndex: number = 1;
  pageSize:number = Constants.PAGE_SIZE;
  state: string = 'rejected';

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
    this.rejectedOffers$ = this.getRejectedOffer();
  }

  getRejectedOffer(): Observable<Offer[]> {
    const params: string = `?state=${this.state}&page=${this.pageIndex}&size=${this.pageSize}`;
    return this.offerService.getLoginUserPostedOffer(params);
  }     

  loadMoreOfferItems(): void {
    this.pageIndex +=1;
    this.rejectedOffers$ = this.getRejectedOffer();
  }

  offerDetail(item: any) {
    this.router.navigate(['/offer-details', 'view', item.offerId]);
  }

}
