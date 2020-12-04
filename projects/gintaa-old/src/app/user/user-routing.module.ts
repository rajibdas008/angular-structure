import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlreadyLoggedInGuard } from '@gintaa/shared/guards';
import { CanDeactivateGuard } from '@gintaa/shared/guards/can.deactivate.guard';
import { OfferDetailsResolverService } from '@gintaa/shared/components/offer-details/offer-details-resolver.service';
import { OfferDetailsComponent } from '@gintaa/shared/components/offer-details/offer-details.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OtpVerifyComponent } from './otpverify/otp-verify.component';
import { PageNotFoundComponent } from '@gintaa/shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from '@gintaa/shared/guards/firebase.auth.guard';
import { FirebaseUserGuard } from '@gintaa/shared/guards/check.firebase.user.guard';


const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
        canActivate: [AlreadyLoggedInGuard],
    },    
    //children: [
      { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [AlreadyLoggedInGuard]
      },
      { 
        path: 'otpverify', 
        component: OtpVerifyComponent
      },      
      { 
        path: 'success', 
        component: EmailVerifiedComponent
      },
      { 
        path: 'offer/:type/:id',
        component: OfferDetailsComponent, 
        resolve: { offerDetail: OfferDetailsResolverService },
        canDeactivate: [CanDeactivateGuard]
      }, 
      { 
        path: 'offer-details/:type/:id',
        component: OfferDetailsComponent, 
        resolve: { offerDetail: OfferDetailsResolverService },
        canActivate: [FirebaseUserGuard],
        canDeactivate: [CanDeactivateGuard]
      },            
      { 
        path: '404', 
        component: PageNotFoundComponent
      }
    //] 
  //} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
