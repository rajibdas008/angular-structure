import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CommonHttpService, OfferService } from '@gintaa/shared';
import { Constants } from '@gintaa/constants';

@Component({
  selector: 'app-user-slider',
  templateUrl: './user-slider.component.html',
  styleUrls: ['./user-slider.component.scss']
})
export class UserSliderComponent implements OnInit {
  myAllPostedOffersImages: any = [];
  OffersImages: any = [];
  pageIndex: number = 1;
  startIndex: number = 0;
  endIndex: number = 5;
  Index: number = 0;
  constructor(
    private httpService: CommonHttpService,
    private router:Router,
    private offerService: OfferService) { }

  ngOnInit() {
    this.getMyAllPostedOffers();
  }
  getMyAllPostedOffers() {
    const params: string = `?page=${this.pageIndex}&size=${Constants.PAGE_SIZE}`;
    this.offerService.getLoginUserPostedOffer(params)
      .pipe(
        map(
          (response) => {
            if (response) {
              return response
                .map(res => {
                  if(res.images && res.images.length > 0 && res.images[0]){
                    return {...res.images[0],'offerId':res.offerId};
                  }
              })
                .filter(res => res != undefined);
            }
          }
        )
      )
      .subscribe(
        (result) => {
          this.myAllPostedOffersImages = result ? result : [];
          this.OffersImages = this.myAllPostedOffersImages.slice(this.startIndex, this.endIndex);
          this.Index = this.myAllPostedOffersImages.length - 1

        },
        (errorResponse) => { this.myAllPostedOffersImages = []; console.log(errorResponse) }
      )
  }

  onArrowClick(value = 'down') {
    if(this.myAllPostedOffersImages.length<5){return};
    if (value == 'up') {
      if (this.Index >0) {
        this.Index -= 1
        this.OffersImages.unshift(this.myAllPostedOffersImages[this.Index]);
        this.OffersImages.pop();
      } else {
        this.Index=this.myAllPostedOffersImages.length-1;
        this.OffersImages.unshift(this.myAllPostedOffersImages[this.Index]);
        this.OffersImages.pop();
      }
      console.log(this.Index)
    } else {
      if (this.endIndex <= this.myAllPostedOffersImages.length - 1) {
        console.log(this.myAllPostedOffersImages.length, "asdfghjkl", this.startIndex, this.endIndex, this.OffersImages.length)
        this.OffersImages.push(this.myAllPostedOffersImages[this.endIndex]);
        this.OffersImages.shift();
        this.endIndex += 1
      } else {
        if (this.startIndex < 4) {
          this.OffersImages.push(this.myAllPostedOffersImages[this.startIndex]);
          this.OffersImages.shift();
          this.startIndex += 1;
        } else {
          this.startIndex = 0;
          this.endIndex = 5;
          this.OffersImages = this.myAllPostedOffersImages.slice(this.startIndex, this.endIndex);
        }

      }
    }
  }
  offerDetail(image: any, status: number) {
    if (status === 0) {
      const navigationExtras: NavigationExtras = {
          queryParams: {
            item: 'new'
          }
      };
      this.router.navigate(['/offer-details', image.offerId], navigationExtras);
    } else {

    }
  }
}
