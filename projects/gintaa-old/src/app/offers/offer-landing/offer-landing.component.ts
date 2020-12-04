import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-landing',
  templateUrl: './offer-landing.component.html',
  styleUrls: ['./offer-landing.component.scss']
})

export class OfferLandingComponent implements OnInit, OnDestroy {
  offerId: string = null;
  timerSub$: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }
  

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.offerId = params.id;
      }
    );
    this.timerSub$ = timer(11000).subscribe(() => {
      this.router.navigate(['../../offer-live', this.offerId], { relativeTo: this.activatedRoute })
    });
  }

  ngOnDestroy(): void {
    if (this.timerSub$) 
      this.timerSub$.unsubscribe();
  }

}
