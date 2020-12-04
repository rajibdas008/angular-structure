import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonHttpService, OfferService } from '@gintaa/shared';
import { Constants } from '@gintaa/constants';
import { Offer } from '@gintaa/shared/modals';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  myPostedOffers$: Observable<Offer[]>;
  postResult: Offer[] = [];
  pageIndex: number = 1;
  postedResultCount: number = 0;
  totalPostCount: number = 0;
  pageSize:number = Constants.PAGE_SIZE;

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
    this.myPostedOffers$ = this.getMyAllPostedOffers();
  }

  getMyAllPostedOffers() {
    const params: string = `?page=${this.pageIndex}&size=${this.pageSize}`;
    return this.offerService.getLoginUserPostedOffer(params)
      .pipe(
        map(
          (resp: Offer[]) => {
            this.postedResultCount = resp.length;
            
            if(this.postedResultCount > 0) {
              this.postResult.push(...resp);
            }           
            resp = this.postResult;
            this.totalPostCount = resp.length;            
            return resp;
          }
        )
      );
  }

  loadMoreOfferItems(): void {
    this.pageIndex +=1;
    this.myPostedOffers$ = this.getMyAllPostedOffers();
  }

  offerDetail(item: any) {
    this.router.navigate(['/offer-details', 'view', item.offerId]);
  }

}


