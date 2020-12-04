import { Component, OnInit } from '@angular/core';

import { CommonHttpService } from '@gintaa/shared/services/common-http.service';
import { UserProfileIncompleteService } from '@gintaa/shared/services/user.profile.incomplete.service';



@Component({
  selector: 'app-new-offer-link',
  templateUrl: './new-offer-link.component.html',
  styleUrls: ['./new-offer-link.component.scss']
})
export class NewOfferLinkComponent implements OnInit {

  constructor (
    private profileIncompleteService: UserProfileIncompleteService
    ) { }

  ngOnInit() {
  }

  checkUserLoggedIn() {
    this.profileIncompleteService.checkLoggedIn('offer');
  }  
}
