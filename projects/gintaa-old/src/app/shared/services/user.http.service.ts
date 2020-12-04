import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Response } from '../model/Response';
import { configUrls } from '@gintaa/shared/config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  constructor(private httpClient: HttpClient) { }

  sentOtp(reqBody: any): Observable<Response> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.sentOtpUrl}`, reqBody);
  }
  verifyOtp(reqBody: any): Observable<HttpResponse<Response>> {
    return this.httpClient.post<Response>(`${environment.serverUrl}${configUrls.verifyOtpUrl}`, reqBody, { observe: 'response' });
  }

}

