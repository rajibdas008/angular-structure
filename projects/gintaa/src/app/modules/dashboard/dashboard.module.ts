import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OngoingDealsComponent } from './components/ongoing-deals/ongoing-deals.component';


@NgModule({
  declarations: [OfferListComponent, OngoingDealsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
