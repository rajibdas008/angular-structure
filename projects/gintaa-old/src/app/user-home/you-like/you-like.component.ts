import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-you-like',
  templateUrl: './you-like.component.html',
  styleUrls: ['./you-like.component.scss']
})
export class YouLikeComponent implements OnInit {
  title = 'angularowlslider';
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:23,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  };
  constructor() { }

  ngOnInit() {
  }

  getPassedData(event) {

  }
}
