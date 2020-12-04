import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CommonHttpService, OfferService } from '@gintaa/shared';
import { Offer, Response } from '@gintaa/shared/modals';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class OfferDetailsResolverService implements Resolve<Offer> {
    constructor(
        private httpService: CommonHttpService,
        private offerService: OfferService,
        private fireAuth: AngularFireAuth,
        private authService: AuthService
        ) {
            this.fireAuth.authState.subscribe(async (user) => {
                if (user) {
                    console.log('user hello:::', user);
                    if (!this.authService.getSignInInput()) {
                        this.authService.setFirebaseUser(user);
                    }
                }
            });
        }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Offer> {
        console.log('Offer Type Value:::', route.paramMap.get('type'));
        console.log('Offer Type Logged In:::', firebase.auth().currentUser); // authState.pipe();
        const offerId: string = route.paramMap.get('id');
        if (route.paramMap.get('type') === 'view') {
            const offerDetails: Observable<Offer> = this.httpService.getPostedOfferById(offerId)
            .pipe(
                map((response: Response) => response.payload ? this.offerService.setMetaTags(response.payload) : null),
                tap(console.log),
                catchError(this.offerService.handleError)
            );
            // const otherOffer: Observable<Offer[]> = this.httpService.userOtherPostedOffers(offerId)
            // .pipe(
            //     map((response: Response) => response.payload ? this.offerService.processOtherOffer(offerId, response.payload) : []),
            //     tap(console.log),
            //     catchError(this.offerService.handleError)
            // );

            // return combineLatest(offerDetails, otherOffer);
            return offerDetails;
        }
        if (route.paramMap.get('type') === 'share') {
            return this.httpService.getOfferBySeoId(route.paramMap.get('id'))
            .pipe(
                map((response: Response) => response.payload ? this.offerService.setMetaTags(response.payload) : null),
                tap(console.log),
                catchError(this.offerService.handleError)
            );
        }
    }
}
