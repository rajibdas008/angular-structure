import { HttpClient, HttpEvent, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/shared/config';
import { UserProfileUpdateRequest, Offer, Response } from '@gintaa/shared/modals';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  constructor (
    private httpClient: HttpClient,
    private cookieService: CookieService
    ) { }

  sentOtp(reqBody: any): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.sentOtpUrl}`, reqBody);
  }
  verifyOtp(reqBody: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );
    return this.httpClient.post<any>(`${environment.serverUrl}${configUrls.verifyOtpUrl}`, reqBody, { headers, observe: 'response' });
  }
  logout(): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.logoutUrl}`, {});
  }
  googleLogIn(): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.googleLogIn}`, {});
  }
  getProfile(): Observable<Response> {
    return this.httpClient.get<Response>(`${environment.serverUrl}${configUrls.profileUrl}`);
  }
  editProfile(reqBody: UserProfileUpdateRequest): Observable<Response> {
    return this.httpClient.put<Response>(`${environment.serverUrl}${configUrls.profileUpdateUrl}`, reqBody);
  }
  getAllAddress(): Observable<Response> {
    return this.httpClient.get<Response>(`${environment.serverUrl}${configUrls.allAddressUrl}`);
  }
  getDefaultAddress(): Observable<Response> {
    return this.httpClient.get<Response>(`${environment.serverUrl}${configUrls.defaultAddressUrl}`);
  }
  addAddress(reqBody: any): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.addAddressUrl}`, reqBody);
  }
  changeDefaultAddress(reqBody: any): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.changeDefaultAddress}`, reqBody);
  }
  updateAddress(reqBody: any): Observable<Response> {
    return this.httpClient.put<Response>(`${environment.serverUrl}${configUrls.addAddressUrl}/${reqBody.addressId}`, reqBody);
  }
  deleteAddress(addressId: string): Observable<Response> {
    let url = `${environment.serverUrl}${configUrls.deleteAddressUrl}`;
    url = url.replace('{addressId}', addressId);
    return this.httpClient.delete<Response>(url);
  }
  profileImg(formData: FormData): Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.uploadProfileImgUrl}`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }
  sendNotificationMobile(reqBody: any): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.sendNotificationMobileUrl}/${reqBody.identifier}`, reqBody);
  }
  sendNotificationEmail(reqBody: any): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.sendNotificationEmailUrl}/${reqBody.identifier}`, reqBody);
  }
  verifyMobile(reqBody: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${environment.serverUrl}${configUrls.verifyMobile}`, reqBody);
  }

  verifyEmail(reqBody: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${environment.serverUrl}${configUrls.verifyEmail}`, reqBody);
  }

  // Offers

  createDraftItemOffer(reqBody: Offer): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.createDraftItemOffer}`, reqBody);
  }

  createDraftServiceOffer(reqBody: Offer): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.createDraftServiceOffer}`, reqBody);
  }

  updateDraftItemOffer(reqBody: Offer): Observable<Response> {
    return this.httpClient.put<Response>(`${environment.serverUrl}${configUrls.updateDraftItemOffer}`, reqBody);
  }

  updateDraftServiceOffer(reqBody: Offer): Observable<Response> {
    return this.httpClient.put<Response>(`${environment.serverUrl}${configUrls.updateDraftServiceOffer}`, reqBody);
  }

  getDraftOfferById(offerId: string): Observable<Response> {
    let url = `${environment.serverUrl}${configUrls.getDraftOfferById}`;
    url = url.replace('{offerId}', offerId);
    return this.httpClient.get<Response>(url);
  }

  getPostedOfferById(offerId: string): Observable<Response> {
    //let url = '../../assets/mock-offer.json'
    let url = `${environment.serverUrl}${configUrls.getOfferById}`;
    url = url.replace('{offerId}', offerId);
    return this.httpClient.get<Response>(url);
  }

  getOfferBySeoId(seoid: string): Observable<Response> {
    let url = `${environment.serverUrl}${configUrls.getOfferBySeoId}`;
    url = url.replace('{seoId}', seoid);
    return this.httpClient.get<Response>(url);
  }

  postDraftItemOffer(reqBody: Offer): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.postDraftItemOffer}`, reqBody);
  }

  postDraftServiceOffer(reqBody: Offer): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.postDraftServiceOffer}`, reqBody);
  }

  myAllDraftOffers(params?: string): Observable<Response> {
    let url: string = `${environment.serverUrl}${configUrls.myAllDraftOffers}`;
    if(params) {
      url = `${url}${params}`;
    }
    return this.httpClient.get<Response>(url);
  }

  myPostedOffers(params?: string): Observable<Response> {
    let url: string = `${environment.serverUrl}${configUrls.myNewOffers}`;
    if(params) {
      url = `${url}${params}`;
    }
    return this.httpClient.get<Response>(url);
  }

  userOtherPostedOffers(id?: string): Observable<Response> {
    let url: string = `${environment.serverUrl}${configUrls.userOtherPostedOffers}`;
    url = url.replace('{id}', id);
    return this.httpClient.get<Response>(url);
  }

  myAllPostedOffers(params?: string): Observable<Response> {
    let url: string = `${environment.serverUrl}${configUrls.myAllNewOffers}`;
    if(params) {
      url = `${url}${params}`;
    }
    return this.httpClient.get<Response>(url);
  }
  updateDraftOfferImages(formData: FormData): Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.updateDraftOfferImage}`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }
  updateDraftOfferVedios(formData: FormData): Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.updateDraftOfferVedio}`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }
  removeDraftOfferVideos(req: any): Observable<Response> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: req
    };
    return this.httpClient.delete<Response>(`${environment.serverUrl}${configUrls.updateDraftOfferVedio}`, options);
  }
  removeDraftOfferImages(req: any): Observable<Response> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: req
    };
    return this.httpClient.delete<Response>(`${environment.serverUrl}${configUrls.updateDraftOfferImage}`, options);
  }
  removeDraftOfferDocuments(req: any): Observable<Response> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: req
    };

    return this.httpClient.delete<Response>(`${environment.serverUrl}${configUrls.updateDraftOfferDocument}`, options);
  }
  updateDraftOfferDocuments(formData: FormData): Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.updateDraftOfferDocument}`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  uploadOfferImages(formData: FormData): Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.uploadOfferImage}`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  uploadOfferVedios(formData: FormData): Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.uploadOfferVedio}`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  uploadOfferDocument(formData: FormData): Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.uploadOfferDocument}`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  previewOfferDocument(doc: any): Observable<Response | Blob> {
    return this.httpClient.get(
      doc.url, {responseType: 'blob'}).pipe(
        tap( // Log the result or error
        data => console.log(doc.orgName, data),
        error => console.log(doc.orgName, error)
      ));
  }

  getOffersByBarterType(barterType: string): Observable<Response> {
    let url = `${environment.serverUrl}${configUrls.offerByBarterType}`;
    url = url.replace('barterType', barterType);
    return this.httpClient.get<Response>(url);
  }
  getOffersByTag(tag: string): Observable<Response> {
    let url = `${environment.serverUrl}${configUrls.offerByTag}`;
    url = url.replace('tag', tag);
    return this.httpClient.get<Response>(url);
  }

  getOfferStat(): Observable<Response> {
    return this.httpClient.get<Response>(`${environment.serverUrl}${configUrls.offerStat}`);
  }

  getDealStat(): Observable<Response> {
    return this.httpClient.get<Response>(`${environment.serverUrl}${configUrls.getDealCount}`);
  }

  getSearchHistory(): Observable<Response> {
    // let history: string = this.cookieService.getCookie('history');
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.set('custom', history);
    // return this.httpClient.get<Response>(url, { headers: headers, withCredentials: true});
    const url: string = `${environment.serverUrl}${configUrls.searchHistory}`;    
    return this.httpClient.get<Response>(url);
  }

  getSuggestion(text: string): Observable<Response> {
    let searchParams: HttpParams = new HttpParams();
    searchParams = searchParams.append('text', text)
    const url: string = `${environment.serverUrl}${configUrls.suggestion}`;
    if(text) {
      return this.httpClient.get<Response>(url, {
        params: searchParams
      })
    }
    return this.httpClient.get<Response>(url);
  }

  getSearchFullText(params?: string): Observable<Response> {
    let url: string = `${environment.serverUrl}${configUrls.searchFullText}`;
    // const headers: HttpHeaders = new HttpHeaders({
    //   'custom': `${this.cookieService.getCookie('search')}`
    // });
    if(params) {
      url = `${url}${params}`;
    }
    return this.httpClient.get<Response>(url);
    // return this.httpClient.get<Response>(url, {
    //   headers
    // });
  }


  //TODO: verify the below service later
  inactiveOffer(offerId: string): Observable<Response> {
    let url = `${environment.serverUrl}${configUrls.inactiveOffer}`;
    url = url.replace('offerId', offerId);
    return this.httpClient.put<Response>(url, {});
  }
  deleteOffer(offerId: string): Observable<Response> {
    let url = `${environment.serverUrl}${configUrls.deleteOffer}`;
    url = url.replace('offerId', offerId);
    return this.httpClient.put<Response>(url, offerId);
  }

  findCategoriesById(categoryId: string): Observable<Response> {
    const url: string = `${environment.serverUrl}${configUrls.getUpdateDeleteCategoryUrl}`.replace('{categoryId}', categoryId);
    return this.httpClient.get<Response>(url);
  }

  findAllCategories(item: string): Observable<Response> {
    const url: string = `${environment.serverUrl}${configUrls.getAllVerticalCategory}?type=${item}`
    return this.httpClient.get<Response>(url)
    .pipe(
      map((res: any) => res['payload'] ? res['payload'] : null)
    );
  }

  findRootCategories(verticalId: string): Observable<any> {
    let depth: HttpParams = new HttpParams();
    depth = depth.append('depth', '1');
    const url: string = `${environment.serverUrl}${configUrls.getRootCategoryUrl}`.replace('{verticalId}', verticalId)
    return this.httpClient.get<any>(url, {
      params: depth
    })
    .pipe(
      map((res: any) => res['payload'] ? res['payload'] : null)
    );
  }

  findCategoryTree(categoryId: string, depthIndex: string = '1'): Observable<any> {
    let depth: HttpParams = new HttpParams();
    depth = depth.append('depth', depthIndex);
    const url: string = `${environment.serverUrl}${configUrls.getCategoriesInRootCategory}`.replace('{categoryId}', categoryId);
    return this.httpClient.get<any>(url, {
      params: depth
    }).pipe(
      map(res => res['payload'] ? res['payload'] : null)
    );
  }

  addCategory(reqBody: any): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.addCategoryUrl}`, reqBody);
  }

  updateCategoryById(categoryId: string, reqBody: any): Observable<Response> {
    const url: string = `${environment.serverUrl}${configUrls.getUpdateDeleteCategoryUrl}`.replace('{categoryId}', categoryId);
    return this.httpClient.put<Response>(url, reqBody);
  }

  removeCategoryById(categoryId: string): Observable<Response> {
    const url: string = `${environment.serverUrl}${configUrls.getUpdateDeleteCategoryUrl}`.replace('{categoryId}', categoryId);
    return this.httpClient.delete<Response>(url);
  }

  getAllTagsByCategoryId(categoryId: string): Observable<Response> {
    const url: string = `${environment.serverUrl}${configUrls.getAddTagUrl}`.replace('{categoryId}', categoryId)
    return this.httpClient.get<Response>(url)
    .pipe(
      map(res => res['payload'] ? res['payload'] : null)
    );
  }

  addTagsByCategoryId(categoryId: string, reqBody: any): Observable<Response> {
    return this.httpClient.post<Response>(
      `${environment.serverUrl}${configUrls.getAddTagUrl}`
      .replace('{categoryId}', categoryId), reqBody);
  }

  updateTagByCategoryIdTagId(categoryId: string, tagId: string, reqBody: any): Observable<Response> {
    const url: string = `${environment.serverUrl}${configUrls.updateDeleteTagUrl}`
    .replace('{categoryId}', categoryId)
    .replace('{tagId}', tagId);
    return this.httpClient.put<Response>(url, reqBody);
  }

  removeTagsByCategoryIdTagId(categoryId: string, tagId: string): Observable<Response> {
    const url: string = `${environment.serverUrl}${configUrls.updateDeleteTagUrl}`
    .replace('{categoryId}', categoryId)
    .replace('{tagId}', tagId);
    return this.httpClient.delete<Response>(url);
  }
}