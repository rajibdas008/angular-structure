import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddOfferImagesComponent } from './add-offer-images/add-offer-images.component';
import { AddAddressComponent } from './addlocation/add-address.component';
import { ChipListComponent } from './chip-list/chip-list.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { OfferLandingComponent } from './offer-landing/offer-landing.component';
import { OfferLiveComponent } from './offer-live/offer-live.component';
import { ShareOfferComponent } from './offer-live/share-offer/share-offer.component';
import { YourItemComponent } from './offer-live/your-item/your-item.component';
import { YourMatchComponent } from './offer-live/your-match/your-match.component';
import { OffersRoutingModule } from './offers-routing.module';
import { PublishingOfferComponent } from './publishing-offer/publishing-offer.component';
import { SuggestesMatchComponent } from './suggestes-match/suggestes-match.component';

@NgModule({
  declarations: [    
    AddAddressComponent,
    OfferLiveComponent,
    AddOfferImagesComponent,
    YourMatchComponent,
    YourItemComponent,
    PublishingOfferComponent,
    ChipListComponent,
    ShareOfferComponent,
    CreateOfferComponent,
    OfferLandingComponent,
    SuggestesMatchComponent,
  ],
  imports: [
    OffersRoutingModule,
    SharedModule
  ],
})
export class OffersModule {}