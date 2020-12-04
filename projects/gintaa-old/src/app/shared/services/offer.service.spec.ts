import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { configUrls } from '@gintaa/shared/config';
import { offerServiceMockData } from '@gintaa/shared/mock-data';
import { environment } from '@gintaa/env';
import { Offer } from '@gintaa/shared/modals';
import { OfferService } from './offer.service';


describe('OfferService', () => {
  let httpMock: HttpTestingController;
  const allRecentOffersUrl = `${environment.serverUrl}${configUrls.myAllNewOffers}`;

  beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ HttpClientModule, HttpClientTestingModule ],
    providers: [
      OfferService, 
      //CommonHttpService, 
      //LoadingScreenService,
      //SharedService
    ]
  })
  httpMock = TestBed.get(HttpTestingController);
});

  afterEach(() => {
    //httpMock.verify();
  });

  it('should be created', () => {
    const service: OfferService = TestBed.get(OfferService);
    expect(service).toBeTruthy();
  });

  it('should have fetch data from posted offer by id', () => {
    const service: OfferService = TestBed.get(OfferService);
    const dummyPosts: Observable<Offer> = of({
      offerType: 'Item',
      offerId: '123',
      name: 'mithun',
      totalOfferValuation: '2000'
  });
  let offerId: string = '123'
  //expect(service.getPostedOfferById(offerId)).toBe(dummyPosts);
  //service.getPostedOfferById(offerId).and.retu
  service.getPostedOfferById(offerId).subscribe(value => {
    expect(value.name).toEqual('Mithun');
  })
  //spyOn(service, 'getPostedOfferById').and.returnValue(of(dummyPosts));
  //tick();

  // service.getPostedOfferById(offerId).subscribe(posts => {
  //     expect(posts.name).toEqual('mithun');
  //     expect(posts.offerId).toEqual(offerId);
  //   });
  });

  it('should have fetch data from offer by seo id', () => {
    const service: OfferService = TestBed.get(OfferService);
    const dummyPosts: Offer = {
      offerType: 'Item',
      offerId: '456',
      name: 'mithun',
      totalOfferValuation: '2000'
  };
  let offerId: string = '456'
  // spyOn(service, 'getOfferBySeoId').and.callFake(() => {
  //   return of(dummyPosts);
  // });  
  service.getOfferBySeoId(offerId).pipe(map(() => null));
  service.getOfferBySeoId(offerId).subscribe(posts => {
      expect(posts.name).toEqual('mithun');
      expect(posts.offerId).toEqual(offerId);
    });
  });
  
  it('should have fetch data from getDraftOfferById', () => {
    const service: OfferService = TestBed.get(OfferService);
    const dummyPosts: Offer = {
      offerType: 'Item',
      offerId: '456',
      name: 'mithun',
      totalOfferValuation: '2000'
  };
  let offerId: string = '456'
  service.getDraftOfferById(offerId).pipe(map(() => null));
  service.getDraftOfferById(offerId).subscribe(posts => {
      expect(posts.name).toEqual('mithun');
      expect(posts.offerId).toEqual(offerId);
    });
  });

  it('should have a method as set final tags', () => {
    const service: OfferService = TestBed.get(OfferService);
    //service.categories = [];
    let categories = [];
    service.setFinalTags(categories);
    expect(service.categories).toEqual([]);
  });

  it('should have a method as get leaf node category id', () => {
    const service: OfferService = TestBed.get(OfferService);
    let categories = [
      {
        'leafNode': true,
        'categoryId': '123'
      }
    ]
    service.categories = categories;
    expect(service.getLeafNodeCategoryId()).toEqual('123');
  });

  it('should have a method as getFinalTags', () => {
    const service: OfferService = TestBed.get(OfferService);
    let categories = [
      {
        'leafNode': true,
        'tagId': 'eee-678',
        'facetLabel': 'Brand'
      },
      {
        'leafNode': false,
        'categoryId': '123'
      }
    ]
    service.categories = categories;
    //service.getFinalTags();
    expect(service.getFinalTags()).not.toBe(null);
  });

  it('should have a method as set media list', () => {
    const service: OfferService = TestBed.get(OfferService);
    //service.categories = [];
    let list = [];
    service.setMediaList(list);
    expect(service.offerMediaList).toEqual([]);
  });

  it('should have a method as get media list', () => {
    const service: OfferService = TestBed.get(OfferService);
    //service.categories = [];
    // let categories = [];
    // service.setFinalTags(categories);
    expect(service.getMediaList()).toEqual([]);
  });

  it('check showLocation method with success',()=>{
    const service:OfferService = TestBed.get(OfferService);
    const input: any = offerServiceMockData.showLocation.requestData;
    const response = offerServiceMockData.showLocation.responseData;
    expect(service.showLocation(input)).toEqual(response.successRes.payload);
  })

  it('check showDesire method',()=>{
    const service:OfferService = TestBed.get(OfferService);
    const input: any = offerServiceMockData.showDesire.requestData;
    const response = offerServiceMockData.showDesire.responseData;
    expect(service.showDesire(input)).toEqual(response.successRes.payload);
  })

  it('check getAllRecentOffers method',()=>{
    const service:OfferService = TestBed.get(OfferService);
    const input: any =offerServiceMockData.getAllRecentOffers.requestData;
    const payload = offerServiceMockData.getAllRecentOffers.responseData.successRes.payload;
    service.getAllRecentOffers(input.params).subscribe((res: any)=>{
      expect(res[0].offerId).toEqual(payload[0].offerId);
      expect(res[0].seOId).toEqual(res[0].seOId);
      expect(res[0].name).toEqual(res[0].name);
    });
   
  })

  it('check getLoginUserPostedOffer method for success response',()=>{
    const service:OfferService = TestBed.get(OfferService);
    const input: any =offerServiceMockData.getLoginUserPostedOffer.requestData;
    const response = offerServiceMockData.getLoginUserPostedOffer.responseData;
    service.getLoginUserPostedOffer(input.params).subscribe((res: any)=>{
      expect(res).toEqual(response.successRes.payload);
    });
   
  })

  it('check getLoginUserPostedOffer method for error response',()=>{
    const service:OfferService = TestBed.get(OfferService);
    const input: any =offerServiceMockData.getLoginUserPostedOffer.requestData;
    const response = offerServiceMockData.getLoginUserPostedOffer.responseData;
    service.getLoginUserPostedOffer(input.params).subscribe((res: any)=>{
    },(errorResponse)=>{
      expect(errorResponse.error.success).toEqual(response.errorRes.success);
      expect(errorResponse.error.code).toEqual(response.errorRes.code);
      expect(errorResponse.error.payload).toEqual(response.errorRes.payload);
    });
   
  })

  it('check getAllRecentOffers method with mock data',()=>{
    const service:OfferService = TestBed.get(OfferService);
    const input: any =offerServiceMockData.getAllRecentOffers.requestData.params;
    const response = offerServiceMockData.getAllRecentOffers.responseData.successRes;
    service.getAllRecentOffers(input).subscribe((res: any)=>{
      expect(res[0].offerId).toEqual(response.payload[0].offerId);
      expect(res[0].seOId).toEqual(response.payload[0].seOId);
      expect(res[0].name).toEqual(response.payload[0].name);
    });

    const req = httpMock.expectOne(`${allRecentOffersUrl}${input}`);
    expect(req.request.method).toEqual('GET');

    req.flush(response);
  })
  
});


