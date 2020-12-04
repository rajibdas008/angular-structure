import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material';
import { RequestInterceptor } from '@gintaa/shared';
import { CanDeactivateGuard } from './shared/guards/can.deactivate.guard';
import { AuthGuard } from './shared/guards/firebase.auth.guard';
import { GeocodingService, PlacePredictionService, PlaceService } from '@gintaa/shared';
import { FirebaseUserGuard } from './shared/guards/check.firebase.user.guard';


@NgModule({
  providers: [
    PlacePredictionService,
    MatNativeDateModule,
    GeocodingService,
    PlaceService,
    CanDeactivateGuard,
    AuthGuard,
    FirebaseUserGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true
    },
    DatePipe,
  ]
})
export class CoreModule {}
