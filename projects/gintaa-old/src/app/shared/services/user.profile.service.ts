import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonHttpService } from '@gintaa/shared/services/common-http.service';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    constructor(
        private httpService: CommonHttpService
    ) { }

    findProfileDefaultAddress() {
    return this.httpService.getAllAddress()
        .pipe(
            map(res => {
                return res.payload ? res.payload : [];
            })
        );
    }

}
