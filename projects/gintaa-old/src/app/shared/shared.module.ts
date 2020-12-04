import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgOtpInputModule } from 'ng-otp-input';
import {
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatExpansionModule,
  MatCardModule,
  MatSlideToggleModule,
  MatIconModule,
  MatMenuModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatListModule,
  MatNativeDateModule,
  MatTooltipModule,
} from '@angular/material';
import { MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { RatingModule } from 'ng-starrating';
import { RouterModule } from '@angular/router';
import { MatVideoModule } from 'mat-video';
import { ImageComponent } from './components/image/image.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { NumberDirective } from './directives/numbers-only.directive';
import { FormatChatDatePipe } from './pipes/format-chat-date.pipe';
import { FormatDateInDays } from './pipes/format-date-in-days.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { FormatUTCTimePipe } from './pipes/format-utc-time.pipe';
import { FormatTimerPipe } from './pipes/format-timer.pipe';
import { JunctionFilterPipe } from './pipes/junction-filter.pipe';
import { RecentItemsComponent } from './components/recent-items/recent-items.component';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferDetailsPrimaryComponent } from './components/offer-details/offer-details-primary/offer-details-primary.component';
import { OfferDetailsSecondaryComponent } from './components/offer-details/offer-details-secondary/offer-details-secondary.component';
import { ReportIssueComponent } from './components/offer-details/report-issue/report-issue.component';
import { OfferSliderComponent } from './components/offer-details/offer-slider/offer-slider.component';
import { OwnerMatchItemsComponent } from './components/offer-details/owner-match-items/owner-match-items.component';
import { OwnerOfferEditHideComponent } from './components/offer-details/owner-offer-edit-hide/owner-offer-edit-hide.component';
import { OwnerOthersOffersComponent } from './components/offer-details/owner-others-offers/owner-others-offers.component';
import { OwnerSendDealComponent } from './components/offer-details/owner-send-deal/owner-send-deal.component';
import { RelatedProductsComponent } from './components/offer-details/related-products/related-products.component';
import { ViewerMatchItemComponent } from './components/offer-details/viewer-match-item/viewer-match-item.component';
import { ViewerOthersOffersComponent } from './components/offer-details/viewer-others-offers/viewer-others-offers.component';
import { ViewerSendDealComponent } from './components/offer-details/viewer-send-deal/viewer-send-deal.component';
import {
  ViewerSimilarOfferOthersUsersComponent
} from './components/offer-details/viewer-similar-offer-others-users/viewer-similar-offer-others-users.component';
import { NewOfferLinkComponent } from './components/new-offer-link/new-offer-link.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MomentModule } from 'ngx-moment';
import { Ng5SliderModule } from 'ng5-slider';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/header/search/search.component';
import { CurrentLocationsComponent } from './components/header/current-locations/current-locations.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/footer/about/about.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRatingComponent } from './components/user-rating/user-rating.component';
import { ChatComponent } from '@gintaa/chat/chat/chat.component';
import { ChatModule } from '@gintaa/chat/chat.module';
import { ProfileIncompleteComponent } from './components/profile-incomplete/profile-incomplete.component';
import { MobileVerifyOtpComponent } from './components/profile-incomplete/mobile-verify-otp/mobile-verify-otp.component';
import { EmailVerifyOtpComponent } from './components/profile-incomplete/email-verify-otp/email-verify-otp.component';
import { ProfileNameVerifyComponent } from './components/profile-incomplete/profile-name-verify/profile-name-verify.component';
import { ProfileEmailVerifyComponent } from './components/profile-incomplete/profile-email-verify/profile-email-verify.component';
import { MobNumberVerifyComponent } from './components/profile-incomplete/mob-number-verify/mob-number-verify.component';
import { ConvertTime12To24Pipe } from './pipes/convert-time12-to24.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    ImageComponent,
    LoadingScreenComponent,
    NewOfferLinkComponent,
    RecentItemsComponent,
    OfferDetailsComponent,
    OfferDetailsPrimaryComponent,
    OfferDetailsSecondaryComponent,
    OfferSliderComponent,
    OwnerMatchItemsComponent,
    OwnerOthersOffersComponent,
    OwnerSendDealComponent,
    ViewerSendDealComponent,
    ViewerMatchItemComponent,
    OwnerOfferEditHideComponent,
    OfferDetailsPrimaryComponent,
    OfferDetailsSecondaryComponent,
    ViewerOthersOffersComponent,
    ViewerSimilarOfferOthersUsersComponent,
    RelatedProductsComponent,
    ReportIssueComponent,
    HeaderComponent,
    SearchComponent,
    CurrentLocationsComponent,
    FooterComponent,
    AboutComponent,
    PageNotFoundComponent,
    NumberDirective,
    FormatTimePipe,
    FormatDatePipe,
    FormatUTCTimePipe,
    FormatTimerPipe,
    FormatDateInDays,
    FormatChatDatePipe,
    ConvertTime12To24Pipe,
    UserRatingComponent,
    JunctionFilterPipe,
    ProfileIncompleteComponent,
    MobileVerifyOtpComponent,
    EmailVerifyOtpComponent,
    ProfileNameVerifyComponent,
    ProfileEmailVerifyComponent,
    MobNumberVerifyComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    NgOtpInputModule,
    CarouselModule,
    ShareButtonsModule.forRoot(),
    RouterModule,
    AutocompleteLibModule,
    MatVideoModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatExpansionModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatListModule,
    MatTreeModule,
    MomentModule,
    Ng5SliderModule,
    RatingModule,
    ChatModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [
    ImageComponent,
    LoadingScreenComponent,
    NewOfferLinkComponent,
    RecentItemsComponent,
    OfferDetailsComponent,
    OfferDetailsPrimaryComponent,
    OfferDetailsSecondaryComponent,
    OfferSliderComponent,
    OwnerMatchItemsComponent,
    OwnerOthersOffersComponent,
    OwnerSendDealComponent,
    ViewerSendDealComponent,
    ViewerMatchItemComponent,
    OwnerOfferEditHideComponent,
    OfferDetailsPrimaryComponent,
    OfferDetailsSecondaryComponent,
    ViewerOthersOffersComponent,
    ViewerSimilarOfferOthersUsersComponent,
    RelatedProductsComponent,
    ReportIssueComponent,
    HeaderComponent,
    SearchComponent,
    CurrentLocationsComponent,
    FooterComponent,
    AboutComponent,
    PageNotFoundComponent,
    NumberDirective,
    FormatDatePipe,
    FormatTimePipe,
    FormatUTCTimePipe,
    FormatTimerPipe,
    FormatDateInDays,
    FormatChatDatePipe,
    JunctionFilterPipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    NgOtpInputModule,
    ShareButtonsModule,
    CarouselModule,
    MatVideoModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatExpansionModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatListModule,
    MatTreeModule,
    MomentModule,
    Ng5SliderModule,
    UserRatingComponent,
    RatingModule,
    MatTooltipModule,
    ProfileIncompleteComponent,
    MobileVerifyOtpComponent,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    ConvertTime12To24Pipe
  ],
  entryComponents: [ImageComponent, ProfileIncompleteComponent]
})
export class SharedModule { }
