import { Component, OnInit } from '@angular/core';
import { CommonHttpService, SharedService } from '@gintaa/shared';
import { OfferDealStat, OfferStat } from '@gintaa/shared/modals';
import { UserProfileIncompleteService } from '@gintaa/shared/services/user.profile.incomplete.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  constructor(
    private httpService: CommonHttpService,
    private sharedService: SharedService,
    private profileIncompleteService: UserProfileIncompleteService) { }

  dealStat$: Observable<any>;
  draftCount: number = 0;
  ngOnInit() {
    this.dealStat$ = this.getHeaderCounts();
    this.sharedService.offerCountMessage.subscribe((result: OfferStat) => {
      this.draftCount = result.draftOfferCounts;
    })
  }

  getHeaderCounts(): Observable<OfferDealStat> {
    return this.httpService.getDealStat()
    .pipe(
      map(
        (response) => response.payload ? response.payload : null
      )
    );
  }

  checkUserProfile() {
    this.profileIncompleteService.checkUserProfile('offer');
  }

}
