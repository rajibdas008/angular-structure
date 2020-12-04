import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonHttpService, OfferService, SharedService } from '@gintaa/shared';
import { Offer, Response } from '@gintaa/shared/modals';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class OfferLiveResolverService implements Resolve<Offer> {
    constructor(
        private httpService: CommonHttpService,
        private offerService: OfferService,
        private sharedService: SharedService
        ) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Offer> {
        const offerId: string = route.paramMap.get('id');
        return this.httpService.getPostedOfferById(offerId)
            .pipe(
                map((response: Response) => response.payload ? this.offerService.setMetaTags(response.payload) : null),
                tap(console.log),
                catchError(this.offerService.handleError)
            );
    }
}