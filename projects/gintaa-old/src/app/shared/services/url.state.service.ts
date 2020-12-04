import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UrlStateService {

    offerType: string;
    offerId: string;

    constructor() {}
}
