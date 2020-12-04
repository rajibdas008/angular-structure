import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SharedService } from '@gintaa/shared';
import { Offer, UploadResponse } from '@gintaa/shared/modals';

@Component({
  selector: 'app-offer-slider',
  templateUrl: './offer-slider.component.html',
  styleUrls: ['./offer-slider.component.scss']
})
export class OfferSliderComponent implements OnInit {

  offerImages: UploadResponse[] = [];
  offerVedios: UploadResponse[] = [];
  medialist: UploadResponse[] = [];
  isBrowser = false;

  constructor(
    public sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  prepareMediaList() {
    // prepare common list for medias
    this.medialist = [];
    this.offerImages.forEach(
      (img) => {
        img.type = 'image';
        this.medialist.push(img);
      }
    );
    this.offerVedios.forEach(
      (video) => {
        video.type = 'video';
        this.medialist.push(video);
      }
    );
  }

  ngOnInit() {
    this.sharedService.offerDetailsFetched.subscribe(
      (offerDetail: Offer) => {
        this.offerImages = [];
        if (offerDetail.images && offerDetail.images.length > 0) {
          offerDetail.images.forEach(image => {
            this.offerImages.push(image);
          });
        }
        this.offerVedios = [];
        if (offerDetail.videos && offerDetail.videos.length > 0) {
          offerDetail.videos.forEach(video => {
            this.offerVedios.push(video);
          });
        }
        this.prepareMediaList();
      }
    );
  }

}
