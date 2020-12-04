import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-publishing-offer',
  templateUrl: './publishing-offer.component.html',
  styleUrls: ['./publishing-offer.component.scss']
})
export class PublishingOfferComponent implements OnInit, OnDestroy {
  t: any;
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
    this.timerSub$ = timer(12000).subscribe(() => {
      this.router.navigate(['../../offer-landing', this.offerId], { relativeTo: this.activatedRoute });
    });
    // this.t = setTimeout(() => {
    //   this.router.navigate(['/offer-live', this.offerId]);
    // }, 45000);
  }

  ngOnDestroy(): void {
    //clearTimeout(this.t);
    if (this.timerSub$) 
      this.timerSub$.unsubscribe();
  }
}
