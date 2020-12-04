import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonHttpService, OfferService } from '@gintaa/shared';
import { Offer } from '@gintaa/shared/modals';
import { Constants } from '@gintaa/constants';

@Component({
  selector: 'app-recent-items',
  templateUrl: './recent-items.component.html',
  styleUrls: ['./recent-items.component.scss']
})
export class RecentItemsComponent implements OnInit {

  recentOffers$: Observable<Offer[]>;
  offerResult: Offer[] = [];
  pageIndex: number = 1;
  offerResultCount: number = 0;
  totalOffersCount: number = 0;

  constructor(
    private httpService: CommonHttpService,
    public offerService: OfferService
  ) { }

  ngOnInit() {
    this.recentOffers$ = this.getMyAllRecentOffers();
  }

  getMyAllRecentOffers() {
    const params: string = `?page=${this.pageIndex}&size=${Constants.PAGE_SIZE}`;
    return this.offerService.getAllRecentOffers(params)
      .pipe(
        map(
          (resp: Offer[]) => {
            this.offerResultCount = resp.length;
            resp.forEach(
              (r) => {
                if (r.images && r.images.length === 0) {
                  r.images = null;
                }

                if (!r.location) {
                  r.location = null;
                }
              }
            );
            if(this.offerResultCount > 0) {
              this.offerResult.push(...resp);
            }           
            resp = this.offerResult;
            this.totalOffersCount = resp.length;            
            return resp;
          }
        )
      );
  }

isShowLoadMore(): boolean {
  return this.offerResultCount === Constants.PAGE_SIZE;
}

loadMoreOfferItems(): void {
  this.pageIndex +=1;
  this.recentOffers$ = this.getMyAllRecentOffers();
}
  
}
