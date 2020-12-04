import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.fireAuth.authState
    .pipe
    (
        take(1),
        map((authState) => !!authState),
        tap((authenticated) => !authenticated ? this.router.navigate(['/login']) : true)
    );
  }
}