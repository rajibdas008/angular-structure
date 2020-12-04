import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CookieService, PlaceService, StorageService } from '@gintaa/shared';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { ApiLoaderService } from './shared/services/api-loader.service';
// import { Gtag } from './common/module/gtag/gtag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gintaa';
  pageContentLoaded: boolean;
  isLoading: boolean = true;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private storageService: StorageService,
    private placeService: PlaceService,
    private cookieService: CookieService,
    private apiLoaderService: ApiLoaderService,
    private cdref: ChangeDetectorRef
  ) { }

  onActivate(event) {
    if (isPlatformBrowser(this.platformId)) {
    window.scroll(0, 0);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set('_lat', this.placeService.getCookie('search-lat'), 10, null, '.gintaa.com', null, null);
      this.cookieService.set('_lng', this.placeService.getCookie('search-lng'), 10, null, '.gintaa.com', null, null);
      this.cookieService.set('_deviceId', this.placeService.getCookie('history'), 10, null, '.gintaa.com', null, null);
    }

    // this.router.events.subscribe(event => {
    //   if (event instanceof RouteConfigLoadStart) {
    //     this.pageContentLoaded = false;
    //   } else if (event instanceof RouteConfigLoadEnd) {
    //     this.pageContentLoaded = true;
    //   }
    // });
    this.apiLoaderService.isLoading.subscribe((v: boolean)=>{
      //window.scroll(0, 0);
      this.isLoading = v;
   })
  }

  
  ngAfterContentChecked(){
    this.cdref.detectChanges();
  }

}
