import { Component, OnDestroy, OnInit } from '@angular/core';
import { OfferService, SharedService, SocialService, TitleTagService } from '@gintaa/shared';
import { Constants } from '@gintaa/constants';

@Component({
  selector: 'app-offer-details-primary',
  templateUrl: './offer-details-primary.component.html',
  styleUrls: ['./offer-details-primary.component.scss']
})
export class OfferDetailsPrimaryComponent implements OnInit, OnDestroy {  
  socialMediums: string[];
  showSharingOptions: boolean = false;

  constructor(
    public sharedService: SharedService,
    public offerService: OfferService,
    public socialService: SocialService,    
    private titleTagService: TitleTagService) { }
    
  ngOnInit() {
    this.socialMediums = Constants.SOCIAL_MEDIUM;
  }      
           
  openShare(event: any) {
    console.log('openShare', event);
  }        
  
  closeShare(event: any) {
    console.log('Hello closeShare', event);
    this.titleTagService.removeSeo();
  }

  ngOnDestroy(): void { }

}
