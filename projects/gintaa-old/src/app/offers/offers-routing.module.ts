import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyCustomerAccess } from '@gintaa/shared/guards';
import { CanDeactivateGuard } from '@gintaa/shared/guards/can.deactivate.guard';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { OfferResolverService } from './create-offer/offers-resolver.service';
import { OfferLandingComponent } from './offer-landing/offer-landing.component';
import { OfferLiveResolverService } from './offer-live/offer-live-resolver.service';
import { OfferLiveComponent } from './offer-live/offer-live.component';
import { PublishingOfferComponent } from './publishing-offer/publishing-offer.component';


const routes: Routes = [
  { 
      path: '', 
      component: CreateOfferComponent,  
      canActivate: [OnlyCustomerAccess], 
      canDeactivate: [CanDeactivateGuard]
  },
  { 
    path: 'publishing-offer/:id', 
    component: PublishingOfferComponent
  },
  { 
    path: 'offer-landing/:id', 
    component: OfferLandingComponent
  },
  { 
    path: 'offer-live/:id', 
    component: OfferLiveComponent,  
    resolve: { offerData: OfferLiveResolverService },
    canActivate: [OnlyCustomerAccess], 
    canDeactivate: [CanDeactivateGuard]
  },
  { 
      path: ':type/:id', 
      component: CreateOfferComponent, 
      resolve: { offerData: OfferResolverService }, 
      canActivate: [OnlyCustomerAccess], 
      canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule {}
