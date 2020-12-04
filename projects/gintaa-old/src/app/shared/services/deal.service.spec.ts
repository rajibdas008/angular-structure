import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { configUrls } from '@gintaa/shared/config';
import { environment } from '@gintaa/env';

import { DealService } from './deal.service';
import { dealServiceMockData } from '../mock-data/index';
import { InitiateDealRequestObject, DealUpdateReqFormat } from '@gintaa/shared/modals';

describe('DealService', () => {
    let httpTestingController: HttpTestingController;
    let service: DealService;

    const initiateDealUrl = `${environment.serverUrl}${configUrls.getInitiateDealUrl}`;
    const initiateDealReqPayload: InitiateDealRequestObject = { ...dealServiceMockData.initiateDeal.reqPayload };
    const initiateDealMockSuccessResponse = { ...dealServiceMockData.initiateDeal.mockSuccessResponse };
    const initiateDealMockErrorResponse = { ...dealServiceMockData.initiateDeal.mockErrorResponse };

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [DealService],
          imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(DealService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#initiateDeal() should match with return data', () => {
        const mockData = { ...initiateDealMockSuccessResponse };
        const keyNames = Object.keys(mockData);

        service.initiateDeal(initiateDealReqPayload).subscribe(retData => {
          expect(retData).not.toBeFalsy();
          expect(retData[keyNames[0]]).toEqual(mockData.success);
          expect(retData[keyNames[1]]).toEqual(mockData.code);
          expect(retData[keyNames[2]]).toEqual(mockData.message);
          expect(retData[keyNames[3]]).toEqual(mockData.payload);
        });

        const req = httpTestingController.expectOne(initiateDealUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(mockData);
    });
});

