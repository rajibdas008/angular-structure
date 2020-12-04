import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormErrorService {
    constructor() {}
    processError(errorResponse: any, formControls: any) {

        if (errorResponse.error
            && !errorResponse.error.success && errorResponse.error.payload) {

          const payload = errorResponse.error.payload;

          if (payload instanceof Array) {
            errorResponse.error.payload.forEach(
              (obj) => {
                const name = obj.param;
                const reason = obj.reason;
                formControls[name].setErrors( { serverError: reason });
              }
            );
          } else if (payload instanceof Object) {
            const param = payload.param;
            const reason = payload.reason;
            if (param && reason) {
              formControls[name].setErrors( { serverError: reason });
            }
          }
        }
    }
}
