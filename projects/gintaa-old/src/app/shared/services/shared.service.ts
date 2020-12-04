import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Offer, AddressResponse, MediaResponse, OfferStat } from '@gintaa/shared/modals';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    offerCountMessage: Subject<OfferStat> = new Subject<OfferStat>();
    offerDetailsFetched: BehaviorSubject<Offer> = new BehaviorSubject<Offer>(null);
    offerDetailsFetched$: Observable<Offer> = this.offerDetailsFetched.asObservable();

    searchCriteriaChangeEvent: Subject<string> = new Subject<string>();
    matchSectionHeight: Subject<number> = new Subject<number>();
    shareOfferSectionHeight: Subject<number> = new Subject<number>();
    
    offerSectionHeight: Subject<number> = new Subject<number>();    
    offerApiError: Subject<any> = new Subject();
    clearSearchText: Subject<any> = new Subject();

    
    chatDealClicked: Subject<boolean> = new Subject<boolean>();

    public rootCategory: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public rootCategory$: Observable<any> = this.rootCategory.asObservable();

    public offerMedia: BehaviorSubject<MediaResponse[]> = new BehaviorSubject<MediaResponse[]>([]);
    public offerMedia$: Observable<MediaResponse[]> = this.offerMedia.asObservable();
    public offerVideoMedia: BehaviorSubject<MediaResponse[]> = new BehaviorSubject<MediaResponse[]>([]);
    public offerVideoMedia$: Observable<MediaResponse[]> = this.offerVideoMedia.asObservable();
    public offerDefaultAddressChange: BehaviorSubject<AddressResponse> = new BehaviorSubject<AddressResponse>({});
    public offerDefaultAddressChange$: Observable<AddressResponse> = this.offerDefaultAddressChange.asObservable();

    constructor() { }
}