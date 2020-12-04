import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserHttpService } from './user.http.service';
import { configUrls } from '@gintaa/shared';
import { userHttpServiceMockData } from '@gintaa/shared/mock-data/user.http.service.mock';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserHttpService;

  const sendOtpUrl = `${environment.serverUrl}${configUrls.sentOtpUrl}`;
  const sendOtpReqPayload = { ...userHttpServiceMockData.sendOtp.reqPayload };
  const sendOtpMockSuccessResponse = { ...userHttpServiceMockData.sendOtp.mockSuccessResponse };
  const sendOtpMockErrorResponse = { ...userHttpServiceMockData.sendOtp.mockErrorResponse };

  const verifyOtpUrl = `${environment.serverUrl}${configUrls.verifyOtpUrl}`;
  const verifyOtpReqPayload = { ...userHttpServiceMockData.verifyOtp.reqPayload };
  const verifyOtpMockErrorResponse = { ...userHttpServiceMockData.verifyOtp.mockErrorResponse };
  const verifyOtpMockSuccessResponse = { ...userHttpServiceMockData.verifyOtp.mockSuccessResponse };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserHttpService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(UserHttpService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#sentOtp() should fail for invalid params', () => {
    const payload = {
      ...sendOtpReqPayload,
      mobile: 'abcd'
    };
    const keyNames = Object.keys(sendOtpMockErrorResponse);
    service.sentOtp(payload).subscribe(retData => {
      expect(retData).not.toBeFalsy();
      expect(retData[keyNames[0]]).toEqual(sendOtpMockErrorResponse.success);
      expect(retData[keyNames[1]]).toEqual(sendOtpMockErrorResponse.code);
      expect(retData[keyNames[2]]).toEqual(sendOtpMockErrorResponse.message);
      expect(retData[keyNames[3]]).toEqual(sendOtpMockErrorResponse.payload);
    });

    const req = httpTestingController.expectOne(sendOtpUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(sendOtpMockErrorResponse);
  });

  it('#sentOtp() should match with return data', () => {
    const mockData = { ...sendOtpMockSuccessResponse };
    const keyNames = Object.keys(mockData);

    service.sentOtp(sendOtpReqPayload).subscribe(retData => {
      expect(retData).not.toBeFalsy();
      expect(retData[keyNames[0]]).toEqual(mockData.success);
      expect(retData[keyNames[1]]).toEqual(mockData.code);
      expect(retData[keyNames[2]]).toEqual(mockData.message);
      expect(retData[keyNames[3]]).toEqual(mockData.payload);
    });

    const req = httpTestingController.expectOne(sendOtpUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockData);
  });

  it('#verifyOtp() should fail for empty OTP', () => {
    const requestbody = { mobile: '7797911115', otp: '' };
    const keyNames = Object.keys(verifyOtpMockErrorResponse);
    const mockErrorResponse = {
      ...verifyOtpMockErrorResponse,
      message: 'Validation Failed',
      payload: [{ param: 'otp', reason: 'Invalid otp' }]
    };

    service.verifyOtp(requestbody).subscribe(retData => {
      expect(retData).not.toBeFalsy();
      expect(retData).toBeDefined();
      expect(retData.body[keyNames[0]]).toEqual(mockErrorResponse.success);
      expect(retData.body[keyNames[1]]).toEqual(mockErrorResponse.code);
      expect(retData.body[keyNames[2]]).toContain(mockErrorResponse.message);
      expect(retData.body[keyNames[3]]).toEqual(mockErrorResponse.payload);
    });

    const req = httpTestingController.expectOne(verifyOtpUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockErrorResponse);
  });

  it('#verifyOtp() should reject invalid OTP format - length < 6', () => {
    const requestbody = {
      ...verifyOtpReqPayload,
      otp: '111'
    };
    const mockErrorResponse = {
      ...verifyOtpMockErrorResponse,
      message: 'Validation Failed',
      payload: [{ param: 'otp', reason: 'Invalid otp' }]
    };
    const keyNames = Object.keys(verifyOtpMockErrorResponse);

    service.verifyOtp(requestbody).subscribe(retData => {
      expect(retData).not.toBeFalsy();
      expect(retData).toBeDefined();
      expect(retData.body[keyNames[0]]).toEqual(mockErrorResponse.success);
      expect(retData.body[keyNames[1]]).toEqual(mockErrorResponse.code);
      expect(retData.body[keyNames[2]]).toContain(mockErrorResponse.message);
      expect(retData.body[keyNames[3]]).toEqual(mockErrorResponse.payload);
    });

    const req = httpTestingController.expectOne(verifyOtpUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockErrorResponse);
  });

  it('#verifyOtp() should fail for invalid OTP', () => {
    const requestbody = { ...verifyOtpReqPayload };
    const keyNames = Object.keys(verifyOtpMockErrorResponse);
    const mockErrorResponse = { ...verifyOtpMockErrorResponse };

    service.verifyOtp(requestbody).subscribe(retData => {
      expect(retData).not.toBeFalsy();
      expect(retData).toBeDefined();
      expect(retData.body[keyNames[0]]).toEqual(mockErrorResponse.success);
      expect(retData.body[keyNames[1]]).toEqual(mockErrorResponse.code);
      expect(retData.body[keyNames[2]]).toContain(mockErrorResponse.message);
      expect(retData.body[keyNames[3]]).toEqual(mockErrorResponse.payload);
    });

    const req = httpTestingController.expectOne(verifyOtpUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockErrorResponse);
  });

  it('#verifyOtp() should match with success response', () => {
    const requestbody = { ...verifyOtpReqPayload };
    const keyNames = Object.keys(verifyOtpMockSuccessResponse);

    service.verifyOtp(requestbody).subscribe(retData => {
      expect(retData).not.toBeFalsy();
      expect(retData).toBeDefined();
      expect(retData.body[keyNames[0]]).toEqual(verifyOtpMockSuccessResponse.success);
      expect(retData.body[keyNames[1]]).toEqual(verifyOtpMockSuccessResponse.code);
      expect(retData.body[keyNames[2]]).toContain(verifyOtpMockSuccessResponse.message);
      expect(retData.body[keyNames[3]]).toEqual(verifyOtpMockSuccessResponse.payload);
    });

    const req = httpTestingController.expectOne(verifyOtpUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(verifyOtpMockSuccessResponse);
  });

});
