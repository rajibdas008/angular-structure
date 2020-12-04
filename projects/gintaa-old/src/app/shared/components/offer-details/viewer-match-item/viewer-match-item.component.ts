import { Component, OnInit } from '@angular/core';
import { SharedService, CategoryService } from '@gintaa/shared';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@gintaa/shared/modals';
import { Constants } from '@gintaa/constants';

@Component({
  selector: 'app-viewer-match-item',
  templateUrl: './viewer-match-item.component.html',
  styleUrls: ['./viewer-match-item.component.scss']
})
export class ViewerMatchItemComponent implements OnInit {
  

  constructor (
    public sharedService: SharedService,
    private route: ActivatedRoute,
    public categoryService: CategoryService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { offerDetail: Offer }) => {
        const offerDetails = data.offerDetail;
      if(offerDetails && offerDetails.desire) {
        this.categoryService.setCategoryId(null);
        this.categoryService.categoryDetails(offerDetails.desire, null, this.categoryService.getCurrentIndex(), Constants.PAGE_SIZE);
      }
    },
    (errorResponse) => { },
    () => {}
    );
  }

}
