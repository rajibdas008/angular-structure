import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService, FooterService } from '@gintaa/shared';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  constructor(
    private headerService: HeaderService,
    private footerService: FooterService,
    private router: Router) { }

  redirect() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.headerService.hideHeader();
    this.footerService.hideFooter();
  }

  ngOnDestroy(): void {
    this.headerService.showHeader();
    this.footerService.showFooter();
  }

}
