import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/shared/config';

import { InitiateDealRequestObject, DealUpdateReqFormat, SaveRatingRequestObject, DealInjectOffer } from '@gintaa/shared/modals';
import { LoggerService } from './logger.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DealService {
    constructor(
        private httpClient: HttpClient,
        private logger: LoggerService) {}

    myOffersSubject$ = new BehaviorSubject<DealInjectOffer[]>([]);
    myOffersSubjectObserver$ = this.myOffersSubject$.asObservable();

    initiateDeal(requestBody: InitiateDealRequestObject) {
        const requestURL = `${environment.serverUrl}${configUrls.getInitiateDealUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.logger.serviceLogger({
            origin: 'deal',
            operationName: configUrls.getInitiateDealUrl,
            operationType: 'POST'
        });
        return this.httpClient.post(requestURL, requestBody, { headers, observe: 'response' });
    }

    updateDeal(requestBody: InitiateDealRequestObject) {
        const requestURL = `${environment.serverUrl}${configUrls.getUpdateDealUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.put(requestURL, requestBody, { headers, observe: 'response' });
    }

    dealUpdateReq({ comments, dealRefId}: DealUpdateReqFormat) {
        const requestURL = `${environment.serverUrl}${configUrls.getUpdateDealReqUrl}/${dealRefId}?comments=${comments}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.put(requestURL, { headers, observe: 'response' });
    }

    getDealsExpiryDate() {
        const requestURL = `${environment.serverUrl}${configUrls.getExpiryDateUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.logger.serviceLogger({
            origin: 'deal',
            operationName: configUrls.getExpiryDateUrl,
            operationType: 'GET'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getJintaaJunctions(lat: any, lng: any) {
        const requestURL = `${environment.serverUrl}${configUrls.getAllJintaaJunctionUrl}`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .append('_lat', lat.toString())
            .append('_lng', lng.toString());

        return this.httpClient.get(requestURL, { headers });
    }

    getDealDetails(dealId: string) {
        const requestURL = `${environment.serverUrl}${configUrls.getDealFromIdUrl}/${dealId}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getAllDeal(input: any) {
        const descSortQuery = '&sort=offeredDate,desc&sort=offeredTime,desc';
        // tslint:disable-next-line: max-line-length
        let queryParams = `?status=${input.status}&page=${input.page}&size=${input.size}&type=${input.type}${descSortQuery}`;
        if (input.startDate && input.startDate !== '') {
            queryParams = `${queryParams}&startDate=${input.startDate}`;
        }
        if (input.endDate && input.endDate !== '') {
            queryParams = `${queryParams}&endDate=${input.endDate}`;
        }
        const reqUrl = `${environment.serverUrl}${configUrls.getAllDeal}${queryParams}`;
        return this.httpClient.get(reqUrl);
    }

    getDealSnapshot(dealId: string) {
        const requestURL = `${environment.serverUrl}${configUrls.getDealSnapshotFromIdUrl}/${dealId}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    cancelDeal(dealRefId: string, comments: string = '') {
        const requestURL = `${environment.serverUrl}${configUrls.getCancelDealUrl}/${dealRefId}?comments=${comments}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.put(requestURL, { headers, observe: 'response' });
    }

    acceptDeal(dealRefId: string) {
        const requestURL = `${environment.serverUrl}${configUrls.acceptDeal}`;
        const requestBody = {
            dealRefNo: dealRefId
        };
        return this.httpClient.post(requestURL, requestBody);
    }

    rejectDeal(input) {
        const comment = input.comment || '';
        const queryParams = `/${input.dealRefId}?comments=${comment}`;
        const reqUrl = `${environment.serverUrl}${configUrls.rejectDeal}${queryParams}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.put(reqUrl, { headers });
    }

    closeDeal(dealRefNo: string, otp: string) {
        const requestURL = `${environment.serverUrl}${configUrls.closeDealUrl}`;
        const requestBody = {
            dealRefNo,
            otp,
        };
        return this.httpClient.post(requestURL, requestBody);
    }

    getRatingConfig() {
        const requestURL = `${environment.serverUrl}${configUrls.dealRatingConfigUrl}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    getQuestionsForRatingContext(contextId: string, rating: number = 1) {
        const requestURL = `${environment.serverUrl}${configUrls.dealRatingQuestionsUrl}/${contextId}/${rating}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.get(requestURL, { headers });
    }

    saveDealUserRating(requestBody: SaveRatingRequestObject) {
        const requestURL = `${environment.serverUrl}${configUrls.saveDealRatingReview}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(requestURL, requestBody, { headers, observe: 'response' });
    }
}
