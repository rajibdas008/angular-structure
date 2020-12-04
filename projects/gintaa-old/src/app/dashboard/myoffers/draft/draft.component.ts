import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonHttpService, OfferService } from '@gintaa/shared';
import { Offer } from '@gintaa/shared/modals';
import { Constants } from '@gintaa/constants';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss']
})
export class DraftComponent implements OnInit {

  myAllDraftOffers$: Observable<Offer[]>;
  offerResult: Offer[] = [];
  pageIndex: number = 1;
  postedResultCount: number = 0;
  totalDraftCount: number = 0;
  pageSize:number = Constants.PAGE_SIZE;

  constructor(
    private httpService: CommonHttpService,
    public offerService: OfferService,
    private router: Router,
    config: NgbCarouselConfig
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
   }

  ngOnInit() {
    this.myAllDraftOffers$ = this.getMyAllDraftOffers();
  }

  getMyAllDraftOffers() {
    const params: string = `?page=${this.pageIndex}&size=${this.pageSize}`;
    return this.offerService.getLoginUserDraftOffer(params)
      .pipe(
        map(
          (resp: Offer[]) => {
            this.postedResultCount = resp.length;
            
            if(this.postedResultCount > 0) {
              this.offerResult.push(...resp);
            }           
            resp = this.offerResult;
            this.totalDraftCount = resp.length;            
            return resp;
          }
        )
      );
  }

loadMoreOfferItems(): void {
  this.pageIndex +=1;
  this.myAllDraftOffers$ = this.getMyAllDraftOffers();
}

offerDetail(item: any, status: number) {
    if (status === 0) {
      //this.router.navigate(['/edit-offer', item.offerType, item.draftOfferId]);
      this.router.navigate(['/add-new-offer', item.offerType, item.draftOfferId]);
    }
  }
}
