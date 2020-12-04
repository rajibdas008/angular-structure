import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CategoryService, SharedService } from '@gintaa/shared';
import { Constants } from '@gintaa/constants';
import { Offer } from '@gintaa/shared/modals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-your-match',
  templateUrl: './your-match.component.html',
  styleUrls: ['./your-match.component.scss']
})
export class YourMatchComponent implements OnInit {
  @ViewChild('potentialMatch', { static: false, read: ElementRef}) _elmRef: ElementRef;

  constructor(
    private sharedService: SharedService,
    public categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.sharedService.offerDetailsFetched
    .subscribe(
      (result: Offer) => {
        if(result && result.desire) {
          this.categoryService.categoryDetails(result.desire, null, this.categoryService.getCurrentIndex(), Constants.PAGE_SIZE);
        }
      }
    );
    // this.activatedRoute.data.subscribe(
    //   (data: { offerData: Offer }) => {
    //   const result: Offer = data.offerData;
    //   if(result && result.desire) {
    //     this.categoryService.categoryDetails(result.desire, null, this.categoryService.getCurrentIndex(), Constants.PAGE_SIZE);
    //   }
    // },
    // (errorResponse) => { },
    // () => {}
    // );
  }


  @HostListener('window:scroll')
  checkScroll() {
    const potentialMatchHeight = this.getCurrentOffsetTop(this._elmRef);
    this.sharedService.matchSectionHeight.next(potentialMatchHeight);
  }

  getCurrentOffsetTop(element: ElementRef): number {
    if(element) {
      const rect = element.nativeElement.getBoundingClientRect();
      return rect.height;
    }
    return 0;
    //return rect.top + window.pageYOffset - document.documentElement.clientTop;
  }
}
