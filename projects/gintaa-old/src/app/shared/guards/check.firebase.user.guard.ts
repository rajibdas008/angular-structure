import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class FirebaseUserGuard implements CanActivate {
  constructor(
      private fireAuth: AngularFireAuth, 
      private router: Router, 
      private authService: AuthService
    ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const type: string = route.paramMap.get('type');
    const id: string = route.paramMap.get('id');
    return this.fireAuth.authState
    .pipe
    (
        take(1),
        map((authState) => !!authState),
        tap((authenticated) => !authenticated ? this.router.navigate(['/offer', type, id]) : true)
    );
    // return this.fireAuth.authState.subscribe(async (user) => {
    //     if (user) {
    //         console.log('user offer details tests:::', user);
    //         if(!this.authService.getSignInInput()) {
    //           this.authService.setFirebaseUser(user);              
    //         } 
    //     }
    //   });
  }
}