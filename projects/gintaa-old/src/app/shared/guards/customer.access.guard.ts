import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class OnlyCustomerAccess implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
        private fireAuth: AngularFireAuth
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const isAuth = this.authService.isAuthenticated();
        // if (isAuth) {
        //     return true;
        // }
        // this.router.navigate(['/login']);
        // return false;
        return this.fireAuth.authState
        .pipe
        (
            take(1),
            map((authState) => {
                if (!!authState) {
                    return true;
                }
                this.router.navigate(['/login']);
                return false;
            }),
            //tap((authenticated) => !authenticated ? this.router.navigate(['/login']) : true)
        );
    }
}