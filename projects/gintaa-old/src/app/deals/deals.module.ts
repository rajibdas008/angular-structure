import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

import { DealComponent } from './deal/deal.component';
import { DealViewerAttachOffersComponent } from './deal-viewer-attach-offers/deal-viewer-attach-offers.component';
import { DealViewerSendPrimaryComponent } from './deal-viewer-send-primary/deal-viewer-send-primary.component';
import { DealViewerSendSecondaryComponent } from './deal-viewer-send-secondary/deal-viewer-send-secondary.component';
import { DealOwnerReceivePrimaryComponent } from './deal-owner-receive-primary/deal-owner-receive-primary.component';
import { DealOwnerReceiveSecondaryComponent } from './deal-owner-receive-secondary/deal-owner-receive-secondary.component';
import { DealOwnerReceiveTertiaryComponent } from './deal-owner-receive-tertiary/deal-owner-receive-tertiary.component';
import { GiveOffersSliderComponent } from './deal-viewer-send-primary/give-offers-slider/give-offers-slider.component';
import { CloseDealComponent } from './close-deal/close-deal.component';
import { DealMsgChatComponent } from './deal-msg-chat/deal-msg-chat.component';
import { JunctionsMeetComponent } from './junctions-meet/junctions-meet.component';
import { NgOtpInputModule } from 'ng-otp-input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { DealRejectComponent } from './deal-reject/deal-reject.component';
import { SharedModule } from '@gintaa/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ChatModule } from '@gintaa/chat/chat.module';
import { environment } from '@gintaa/env';

@NgModule({
  declarations: [
    DealComponent,
    DealViewerAttachOffersComponent,
    DealViewerSendPrimaryComponent,
    DealViewerSendSecondaryComponent,
    GiveOffersSliderComponent,
    DealOwnerReceivePrimaryComponent,
    DealOwnerReceiveSecondaryComponent,
    DealOwnerReceiveTertiaryComponent,
    CloseDealComponent,
    DealMsgChatComponent,
    JunctionsMeetComponent,
    DealRejectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatSlideToggleModule,
    CarouselModule,
    MatDatepickerModule,
    NgOtpInputModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    SharedModule,
    RouterModule,
    ChatModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    AgmDirectionModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ],
  exports: [
    DealComponent
  ],
  entryComponents: [DealComponent, DealRejectComponent, JunctionsMeetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DealsModule { }
