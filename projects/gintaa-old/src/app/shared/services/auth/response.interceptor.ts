import 'rxjs/add/operator/do';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class ResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        event => this.handleResponse(req, event),
        error => this.handleError(req, error)
      )
    );
  }
  handleResponse(req: HttpRequest<any>, event) {
    console.log('Handling response for ', req.url, event);
    if (event instanceof HttpResponse) {
      console.log('Request for ', req.url,
        ' Response Status ', event.status,
        ' With body ', event.body);
    }
  }

  handleError(req: HttpRequest<any>, event) {
    console.error('Request for ', req.url,
      ' Response Status ', event.status,
      ' With error ', event.error);
    if (event instanceof HttpErrorResponse) {
      if (event.status === 401) {
        // error handling
      }
    }
  }
}
