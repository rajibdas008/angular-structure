import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnlyCustomerAccess } from '@gintaa/shared/guards';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ClosedDealComponent } from './deals/closed-deals/closed-deals.component';
import { DealDetailsComponent } from './deals/deal-details/deal-details.component';
import { DealGiveComponent } from './deals/deal-details/deal-give/deal-give.component';
import { DealTakeComponent } from './deals/deal-details/deal-take/deal-take.component';
import { DealsComponent } from './deals/deals.component';
import { ReceivedDealsComponent } from './deals/received-deals/received-deals.component';
import { SendDealsComponent } from './deals/send-deals/send-deals.component';
import { ActiveComponent } from './myoffers/active/active.component';
import { DraftComponent } from './myoffers/draft/draft.component';
import { MyOffersComponent } from './myoffers/my-offers.component';
import { UnpublishedComponent } from './myoffers/unpublished/unpublished.component';
import { OngoingOffersComponent } from './ongoing-offers/ongoing-offers.component';
import { ReceiveOfferComponent } from './ongoing-offers/receive-offer/receive-offer.component';
import { SentOfferComponent } from './ongoing-offers/sent-offer/sent-offer.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { ChartsComponent } from './transaction/charts/charts.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RejectedComponent } from './myoffers/rejected/rejected.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SubHeaderComponent,
    OngoingOffersComponent,
    DealsComponent,
    ClosedDealComponent,
    SendDealsComponent,
    ReceivedDealsComponent,
    DealDetailsComponent,
    DealGiveComponent,
    DealTakeComponent,
    SentOfferComponent,
    ReceiveOfferComponent,
    MyOffersComponent,
    TransactionComponent,
    ChartsComponent,
    DraftComponent,
    ActiveComponent,
    UnpublishedComponent,
    RejectedComponent
  ],
  imports: [
    NgbModule,
    ChartsModule,
    RouterModule.forChild([
        { 
            path: '', 
            component: DashboardComponent, 
            canActivate: [OnlyCustomerAccess],
            children: [                
                {
                  path: ':type',
                  component: DashboardComponent
                }
              ]
        }
    ]),
    SharedModule
  ],
})
export class DashboardModule {}