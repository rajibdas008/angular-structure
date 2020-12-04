import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { TagsSeo, Offer, UserOffer, Response } from '@gintaa/shared/modals';
import { LoadingScreenService } from '@gintaa/shared/components/loading-screen/loading-screen.service';
import { CommonHttpService } from '@gintaa/shared/services/common-http.service';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { SocialService } from '@gintaa/shared/services/social.share.service';
import { TitleTagService } from '@gintaa/shared/services/TitleTagService';

@Injectable({
    providedIn: 'root'
})
export class OfferService {

  categories: any[] = [];
  offerMediaList: any[] = [];

  constructor(
      private httpService: CommonHttpService,
      private loadingScreenService: LoadingScreenService,
      private sharedService: SharedService,
      private socialService: SocialService,
      private titleTagService: TitleTagService
    ) {}

  getPostedOfferById(offerId: string): Observable<Offer> {
    return this.httpService.getPostedOfferById(offerId)
    .pipe(
      map((response) => {
        if(response.payload) {
          this.sharedService.offerDetailsFetched.next(response.payload);
          return response.payload
        }
        return null;
      })
    );
  }

  getOfferBySeoId(seoId: string): Observable<Offer>  {
    return this.httpService.getOfferBySeoId(seoId)
    .pipe(
      map(
        (response) => response.payload ? response.payload : null
      )
    );
  }
  
  getDraftOfferById(draftOfferId: string) {
    return this.httpService.getDraftOfferById(draftOfferId)
    .pipe(
      map(
        (response) => response.payload ? response.payload : null
      )
    );
  }

  setFinalTags(categories: any[]): void {
    this.categories = categories;
  }

  getLeafNodeCategoryId() : string {
    let categoryId: string = null;
    this.categories.forEach(item => {
      if(item.leafNode) {
        categoryId = item.categoryId;
      } 
    })
    return categoryId;
  }

  getCurrentNodeCategoryId(): string {
    let categoryId: string = this.getLeafNodeCategoryId();    
    if(!categoryId && this.categories.length) {
      //return categoryId;
      let { [this.categories.length -1]: last } = this.categories;
      categoryId = last.categoryId;
      console.log('Category Id:::', categoryId);
    } 
    return categoryId;
  }

  getFinalTags(): any[] {
    // const presentTagCategories = this.categories.filter(category => category.tagId !== null);
    let presentTagCategories = [];
    let tagObjArray = [];
    this.categories.forEach(item => {
      if(item.tagId || (item.tagId === '' && item.name)) {
        presentTagCategories.push(item) 
      }
    })
    if(presentTagCategories.length) {
      presentTagCategories.forEach((tagCategory) => { 
          let isMatched = null;
          let tagObj = {};    
          const primaryFacet = (tagCategory.tagId === '' && tagCategory.name) ? tagCategory.name : tagCategory.facetLabel;
          tagObjArray.forEach((item) => {
            if(item.name === primaryFacet) {
              isMatched = true;
              item.values = tagCategory.tagId === '' && tagCategory.name ? 
              [...item.values, tagCategory.label] : [...item.values, tagCategory.value]
            }
          })
          if(!isMatched) {
            tagObj = !(tagCategory.tagId === '' && tagCategory.name) ? {
              "name": primaryFacet,
              "label": primaryFacet,
              "values": [
                tagCategory.value
              ]
            } : {
              "name": primaryFacet,
              "label": primaryFacet,
              "values": [
                tagCategory.label
              ]
            }
            tagObjArray = [...tagObjArray, tagObj]
          }          
      });
      // console.log('Before Return:::::', tagObjArray); 
      return tagObjArray;
    }
    // console.log('Finnally:::::', tagObjArray);
    return tagObjArray;
  }

  createServiceOffer(draftOfferObj: Offer): Observable<any> {
    return this.httpService.createDraftServiceOffer(draftOfferObj)
    .pipe(
      map((response: Response) => response.payload ? response.payload : null),
      tap(
        data => {
          console.log('response data:::', data)
          this.loadingScreenService.stopLoading();
        },
        error => {
          this.loadingScreenService.stopLoading();
          this.handleError(error);
        }
      )
    );
  }

  updateServiceOffer(draftOfferObj: Offer): Observable<any> {
    return this.httpService.updateDraftServiceOffer(draftOfferObj)
    .pipe(
      map((response: Response) => response.payload ? response.payload : null),
      tap(
        data => {
          console.log('response data:::', data)
          this.loadingScreenService.stopLoading();
        },
        error => {
          this.loadingScreenService.stopLoading();
          this.handleError(error);
        }
      )
    );
  }

  createDraftOffer(draftOfferObj: Offer): Observable<any> {
    return this.httpService.createDraftItemOffer(draftOfferObj)
    .pipe(
      map((response: Response) => response.payload ? response.payload : null),
      tap(
        data => {
          console.log('response data:::', data)
          this.loadingScreenService.stopLoading();
        },
        error => {
          this.loadingScreenService.stopLoading();
          this.handleError(error);
        }
      )
    );
  }

  updateDraftOffer(draftOfferObj: Offer): Observable<any> {
    return this.httpService.updateDraftItemOffer(draftOfferObj)
    .pipe(
      map((response: Response) => response.payload ? response.payload : null),
      tap(
        data => {
          console.log('response data:::', data)
          this.loadingScreenService.stopLoading();
        },
        error => {
          this.loadingScreenService.stopLoading();
          this.handleError(error);
        }
      )    
    );
  }

  handleError(error: HttpErrorResponse) {
    //this.loadingScreenService.stopLoading();
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  setMediaList(list: any) {
    this.offerMediaList = list;
  }

  getMediaList(): any[] {
    return this.offerMediaList;
  }

  showLocation(offer: Offer): string {
    if (offer && offer.location && offer.location.addressLine) {
        const address: string = offer.location.addressLine;
        return address.includes(',') ? address.slice(0, (address.indexOf(','))) : address;
    }
    return null;
  }

  showDesire(offer: Offer): string {
    return offer && offer.desire && offer.desire.length > 10 ? offer.desire.slice(0, 10) : offer.desire;
  }

  getAllRecentOffers(param?: string): Observable<Offer[]> {
    return this.httpService.myAllPostedOffers(param)
    .pipe(
      map(
        (response) => response.payload || []
      )
    );
  }

  getLoginUserPostedOffer(param?: string): Observable<Offer[]> {
    return this.httpService.myPostedOffers(param)
    .pipe(
      map(
        (response) => response.payload || []
      )
    );
  }

  getUserPostedOtherOffers(offerId: string): Observable<Offer[]> {
    return this.httpService.userOtherPostedOffers(offerId)
    .pipe(
        map((response: Response) => response.payload ? this.processOtherOffer(offerId, response.payload) : []),
        catchError(this.handleError)
    );
  }

  getLoginUserDraftOffer(param?: string): Observable<Offer[]> {
    return this.httpService.myAllDraftOffers(param)
    .pipe(
      map(
        (response) => response.payload || []
      )
    );
  }

  isShowLoadMore(offers:number, page:number): boolean {
    return offers === page;
  }

  public processOtherOffer(oid: string, data: UserOffer): Offer[] {
    const itemOffers: Offer[] = data && data.Item ? data.Item : [];
    const serviceOffers: Offer[] = data && data.Service ? data.Service : [];
    if (itemOffers.length && serviceOffers.length) {
        return [...itemOffers, ...serviceOffers].filter(offer => offer.offerId !== oid);
    } else if (itemOffers.length && !serviceOffers.length) {
        return [...itemOffers].filter(offer => offer.offerId !== oid);
    } else {
        return [...serviceOffers].filter(offer => offer.offerId !== oid);
    }
  }

  setMetaTags(response) {
    const socialData = this.socialService.getSocialDetail(response);
    const seo: TagsSeo = {
      title: socialData.title,
      description: socialData.description,
      image: socialData.imageUrl,
      url: socialData.shareUrl,
    };
    this.titleTagService.setSeo(seo);
    console.log('Response set in offer deatils fetched sub12336646::', response);
    this.sharedService.offerDetailsFetched.next(response);
    return response;
}
}
