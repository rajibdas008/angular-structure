import { AnimationEvent } from '@angular/animations';
import { LocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideUpDownSmooth } from '@gintaa/animations';
import { CanComponentDeactivate } from '@gintaa/shared/guards/can.deactivate.guard';
import { TitleTagService, SharedService, AlertService, CategoryService } from '@gintaa/shared';
import { Offer } from '@gintaa/shared/modals/OfferModel';

@Component({
  selector: 'app-offer-live',
  templateUrl: './offer-live.component.html',
  styleUrls: ['./offer-live.component.scss'],
  animations: [ slideUpDownSmooth]
})
export class OfferLiveComponent implements OnInit, AfterViewInit, CanComponentDeactivate  {

  @ViewChild('offerLive', { static: false, read: ElementRef}) _elementRef: ElementRef;
  offerId: string;
  isBackButtonPressed: boolean;  
  offerDetail: Offer;


  matchSectionHeight: number = 0;
  pageOffset: number = 0;
  offerLiveSectionHeight: number = 0;
  sharedSectionHeight: number = 0;
  isSticky: boolean = false;
  isPositionFixed: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationStrategy: LocationStrategy,
    private alertService: AlertService,
    private router: Router,
    private titleTagService: TitleTagService,
    private sharedService: SharedService,
    public categoryService: CategoryService
  ) { 
    const url: string = this.router.url;
    this.locationStrategy.onPopState(() => {
      if (url.indexOf('offer-live') > 0) {
        this.isBackButtonPressed = true;
        return false;
      }
    });
  }

  ngAfterViewInit(): void {
    window.scrollTo(0,0);    
    this.sharedService.matchSectionHeight.subscribe((height) => {   
      this.matchSectionHeight = height;
      //console.log('match sec height in offer live :::', this.matchSectionHeight);
    });
    
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: { offerData: Offer }) => {
      const result: Offer = data.offerData;
      this.offerDetail = result;
      this.sharedService.offerDetailsFetched.next(this.offerDetail);
    },
    (errorResponse) => { },
    () => {
      window.scrollTo(0,0);
    });   

    this.sharedService.shareOfferSectionHeight.subscribe((height) => {
      window.scrollTo(0,0);
      this.sharedSectionHeight = height;
      //console.log('sharedSectionHeight sec height:::', this.sharedSectionHeight);
    })
  }

  canDeactivate() {
    if (this.isBackButtonPressed) {
      this.isBackButtonPressed = false;
      this.alertService.showInfo('<div> Your offer is already created. <br/> Please navigate from My Account menu. </div>');
      return false;
    }
    return this.titleTagService.removeSeo();
    // return true;
  }

  

  @HostListener('window:scroll')
  checkScroll() {
    this.pageOffset = window.pageYOffset;
    this.offerLiveSectionHeight = this._elementRef.nativeElement.offsetHeight;
    const potentialMatchHeight: number = this.offerLiveSectionHeight - this.sharedSectionHeight;
    if(potentialMatchHeight > 125) {
      this.isSticky = this.pageOffset > this.sharedSectionHeight;
      const totalHeight = (this.matchSectionHeight + this.sharedSectionHeight - 100);
      this.isPositionFixed = this.pageOffset > totalHeight ? false : true;
    } else {
      this.isSticky = this.pageOffset > 200;
      this.isPositionFixed = this.pageOffset > 250 ? false : true; 
    }    
  }

  animationDone(event: AnimationEvent) {
    if(event.fromState === 'visible' && event.toState === 'hidden') {

    }
  }

  


}