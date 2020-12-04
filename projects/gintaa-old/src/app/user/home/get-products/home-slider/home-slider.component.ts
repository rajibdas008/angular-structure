import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { map } from 'rxjs/operators';
import { CommonHttpService } from '@gintaa/shared';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {
  myAllPostedOffersImages: any = [];
  OffersImages: any = [];
  offerLimit: number = 10;
  startIndex: number = 0;
  endIndex: number = 5;
  Index: number = 0;
  constructor(private httpService: CommonHttpService,private router:Router) { }

  ngOnInit() {
    //this.getMyAllPostedOffers();
  }
  getMyAllPostedOffers() {
    this.httpService.myAllPostedOffers()
      .pipe(
        map(
          (response) => {
            if (response.payload) {
              return response.payload
                .map(res => {
                  if(res.images && res.images.length > 0 && res.images[0]){
                    return {...res.images[0],'offerId':res.offerId};
                  }
              })
                .filter(res => res != undefined);
            }
            return null;
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
