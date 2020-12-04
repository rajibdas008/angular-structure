import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { CommonHttpService, OfferService, SharedService } from '@gintaa/shared';
import { Offer, Response } from '@gintaa/shared/modals';

@Injectable({
    providedIn: 'root'
})

export class OfferResolverService implements Resolve<Offer> {
    constructor(
        private httpService: CommonHttpService,
        private offerService: OfferService,
        private sharedService: SharedService
        ) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.httpService.getDraftOfferById(route.paramMap.get('id'))
        .pipe(
            map((response: Response) => response.payload ? response.payload : null),
            catchError(this.offerService.handleError)
          )
    }
}