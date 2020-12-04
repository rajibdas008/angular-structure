import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { environment } from '@gintaa/env';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';

import { BannerComponent } from './home/banner/banner.component';
import { GetProductsComponent } from './home/get-products/get-products.component';
import { HomeSliderComponent } from './home/get-products/home-slider/home-slider.component';
import { HomeMaylikeComponent } from './home/home-maylike/home-maylike.component';
import { HomeComponent } from './home/home.component';
import { ProductCategoryComponent } from './home/product-category/product-category.component';
import { SwitchTranslationComponent } from './home/switch-translation/switch-translation.component';
import { TrandingItemComponent } from './home/tranding-item/tranding-item.component';
import { LoginComponent } from './login/login.component';
import { OtpVerifyComponent } from './otpverify/otp-verify.component';
import { TrackUserComponent } from './track-user/track-user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserappstoreComponent } from './userappstore/userappstore.component';
import { I18nModule } from '@gintaa/i18n/i18n.module';
import { SigninHeadsUpComponent } from './signin-heads-up/signin-heads-up.component';
import { EmailSignupComponent } from './email-signup/email-signup.component';
import { EmailResetPasswordComponent } from './email-reset-password/email-reset-password.component';
import { EmailSigninComponent } from './email-signin/email-signin.component';


@NgModule({
  declarations: [    
    HomeComponent,    
    BannerComponent,
    
    ProductCategoryComponent,
    TrandingItemComponent,
    GetProductsComponent,
    HomeSliderComponent,
    HomeMaylikeComponent,
    SwitchTranslationComponent,
    TrackUserComponent,    
    LoginComponent,
    OtpVerifyComponent,
    UserappstoreComponent,    
    EmailVerifiedComponent, SigninHeadsUpComponent, EmailSignupComponent, EmailResetPasswordComponent, EmailSigninComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    UserRoutingModule,    
    I18nModule,
    SharedModule,
    TranslateModule,
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class UserModule {}
