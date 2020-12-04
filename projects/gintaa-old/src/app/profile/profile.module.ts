import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnlyCustomerAccess } from '@gintaa/shared/guards';
import { SharedModule } from '../shared/shared.module';
import { AddProfileLocationComponent } from './add-profile-location/add-profile-location.component';
import { ProfileComponent } from './profile.component';
import { ProfilePhotoComponent } from './profilephoto/profile-photo.component';
import { ProfileshareComponent } from './profileshare/profileshare.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    ProfileComponent, 
    ProfilePhotoComponent,
    ProfileshareComponent,
    AddProfileLocationComponent
  ],
  imports: [
    RouterModule.forChild([
        { 
            path: '', 
            component: ProfileComponent, 
            canActivate: [OnlyCustomerAccess] 
        }
    ]),
    SharedModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#51c878",
      "outerStrokeGradientStopColor": "#51c878",
      "innerStrokeColor": "#51c878",
      "innerStrokeWidth": 10,
      "title": "",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
    }),
  ],
})
export class ProfileModule {}