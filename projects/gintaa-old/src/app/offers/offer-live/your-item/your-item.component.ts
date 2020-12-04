import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService, SocialService } from '@gintaa/shared';
import { Constants } from '@gintaa/constants';
import { Offer } from '@gintaa/shared/modals';
import { environment } from '@gintaa/env';

@Component({
  selector: 'app-your-item',
  templateUrl: './your-item.component.html',
  styleUrls: ['./your-item.component.scss']
})
export class YourItemComponent implements OnInit {
  @Input() showArrow: boolean = false;
  offerDetail: Offer;
  socialMediums: string[];
  publicUrl: string = environment.WEBSITE_URL;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    public socialService: SocialService
  ) { }

  ngOnInit() {
    this.socialMediums = Constants.SOCIAL_MEDIUM;
    this.sharedService.offerDetailsFetched
    .subscribe(
      (result: Offer) => {
        console.log('response in your item component::::::', result);
        this.offerDetail = result;
        this.socialService.prepareSocialDetail(this.offerDetail);
      }
    );
    // this.activatedRoute.data.subscribe(
    //   (data: { offerData: Offer }) => {
    //   const result: Offer = data.offerData;
    //   this.offerDetail = result;
    // },
    // (errorResponse) => { },
    // () => {}
    // );
  }

  showDetail(item: any) {
    this.router.navigate(['/offer-details', 'view', item.offerId]);
  }
}
