import { Component, OnInit } from '@angular/core';
import { Offer } from '@gintaa/shared/modals';
import { SharedService } from '@gintaa/shared/services/shared.service';

@Component({
  selector: 'app-owner-offer-edit-hide',
  templateUrl: './owner-offer-edit-hide.component.html',
  styleUrls: ['./owner-offer-edit-hide.component.scss']
})
export class OwnerOfferEditHideComponent implements OnInit {
  offerDetails: Offer;

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    
  }
}
