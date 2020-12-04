import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SharedService } from '@gintaa/shared';
import { environment } from '@gintaa/env';
import { Offer } from '@gintaa/shared/modals';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-share-offer',
  templateUrl: './share-offer.component.html',
  styleUrls: ['./share-offer.component.scss']
})
export class ShareOfferComponent implements OnInit, AfterViewInit {
  @ViewChild('shareSection', { static: false, read: ElementRef}) shareSectionRef: ElementRef;
  shareSectionHeight: number = 0;
  offerDetail: Offer;

  constructor(
    private sharedService: SharedService,    
    private activatedRoute: ActivatedRoute,
    private title: Title) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: { offerData: Offer }) => {
      const result: Offer = data.offerData;
      this.offerDetail = result;
    },
    (errorResponse) => { },
    () => {
      // window.scrollTo(0,0);
    });
  }

  ngAfterViewInit(): void {
    this.shareSectionHeight = this.shareSectionRef.nativeElement.offsetHeight;
    this.sharedService.shareOfferSectionHeight.next(this.shareSectionHeight);
  } 

  shareOnSocialNetwork(site: string): void {
    let url: string = null;
    const currentUrl:string = `${environment.WEBSITE_URL}/offer-details/share/${this.offerDetail.seOId}`
    switch (site) {
      case 'pinterest':
        url = `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}`
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentUrl)}`
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
        break;
      case 'Whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`
        break;
      case 'Email':
        url = `mailto:?subject=${encodeURIComponent(this.title.getTitle())}&body=${encodeURIComponent(currentUrl)}`
        break;
      default:
        break;
    }
    window.open(url, "_blank");
  }
}
