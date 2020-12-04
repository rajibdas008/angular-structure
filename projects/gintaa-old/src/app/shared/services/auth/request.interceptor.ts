import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { reqUrlConfigs } from './req.interceptor.config';
import { Router } from '@angular/router';
import { AlertService } from '@gintaa/shared/services/alert.service';
import { ApiLoaderService } from '@gintaa/shared/services/api-loader.service';
import { FirebaseAuthService } from './firebase.auth.service';
import { LoggerService, InterceptorLoggerObject } from '../logger.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    apiRequests: HttpRequest<any>[] = [];
    loading: boolean = false;
    loggerObject: InterceptorLoggerObject;
    constructor(
        public auth: AuthService,
        private router: Router,
        private alertService: AlertService,
        private firebaseAuthService: FirebaseAuthService,
        private loggerService: LoggerService,
        private apiLoaderService: ApiLoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.apiLoaderService.isLoading.next(true);
        this.loggerObject = {
            logType: 'log',
            url: request.url,
            headers: request.headers,
            params: request.params,
            method: request.method,
            requestObject: request.body,
            startTimeStamp: new Date().getTime(),
        };
        return from(this.handleAccess(request, next));
    }

    async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        let token = '';
        const currentUser = await firebase.auth().currentUser;

        if (currentUser) {
            token = await currentUser.getIdToken();
            this.loggerObject.currentUser = currentUser.displayName || currentUser.phoneNumber || currentUser.email;
        }
        // console.log(token);
        const isTokenRequired: boolean = !reqUrlConfigs.noTokens.includes(request.url);
        this.loggerObject.isTokenRequired = isTokenRequired;
        request = request.clone({ withCredentials: true });
        if (token && isTokenRequired) {
            request = request.clone({
                headers: request.headers.append('X-Authorization-Firebase', `${token}`)
            });
            this.loggerObject.headers = request.headers;
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.removeRequest(request);
                }
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    // save success reference
                    this.loggerObject.logType = 'log';
                    this.loggerObject.responseObject = event;
                    this.loggerObject.endTimeStamp = new Date().getTime();
                    this.loggerService.interceptLogger(this.loggerObject);
                }
                return event;
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                this.removeRequest(request);
                if (errorResponse instanceof HttpErrorResponse) {
                    // save error reference
                    this.loggerObject.logType = 'error';
                    this.loggerObject.responseObject = errorResponse;
                    this.loggerObject.endTimeStamp = new Date().getTime();
                    this.loggerService.interceptLogger(this.loggerObject);

                    if (!errorResponse.error.success && errorResponse.error.code == 403) {
                        // this.firebaseAuthService.signOut();
                        // this.router.navigate(['/login']);
                        return;
                    }
                }
                return throwError(errorResponse);
            })).toPromise();
    }

    removeRequest(req: HttpRequest<any>) {
        const i = this.apiRequests.indexOf(req);
        if (i >= 0) {
          this.apiRequests.splice(i, 1);
        }
        this.apiLoaderService.isLoading.next(this.apiRequests.length > 0);
      }
}
