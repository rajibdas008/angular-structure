import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import { CommonHttpService, HeaderMetaData, HeaderService, HeaderType } from '@gintaa/shared';
import { GintaaUser } from '@gintaa/shared/services/auth/auth.user';
import { FirebaseAuthService } from '@gintaa/shared/services/auth/firebase.auth.service';
import { PlaceService } from '@gintaa/shared/services/place.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username = '';
  profileUrl = '';
  headerMeta: HeaderMetaData;
  headerType = HeaderType;

  constructor(
    private router: Router,
    public authService: AuthService,
    public firebaseAuthService: FirebaseAuthService,
    private headerService: HeaderService,
    public placeService: PlaceService,
    private httpService: CommonHttpService) {

    authService.signInEvent.subscribe(user => this.setLogInInfo(user));

    headerService.headerChangeEvent.subscribe(
      (headerMeta: HeaderMetaData) => {
        this.headerMeta = headerMeta;
      }
    );
  }

  ngOnInit() {
    const isAuth = this.authService.isAuthenticated();
    const headerMeta = {
      hideHeader: false,
      headerType: HeaderType.BEFORE_LOGIN
    };
    if (isAuth) {
      headerMeta.headerType = HeaderType.AFTER_LOGIN;
      this.username = this.authService.getAuthInfo().username;
      this.profileUrl = this.authService.getAuthInfo().profileUrl;
    }
    this.headerService.notifyHeaderChange(headerMeta);
  }

  public logout(event: any) {
    event.preventDefault();
    this.firebaseAuthService.signOut()
    .subscribe(() => {
      this.cleanLoginInfo();
    }, err => console.log('Logout Failed', err));

    // this.httpService.logout()
    //   .subscribe((response) => {
    //   },
    //   (errResponse) => {
    //   });
  }


  private cleanLoginInfo(): void {
    this.authService.clearAuthInfo();
    const headerMeta = {
      hideHeader: false,
      headerType: HeaderType.BEFORE_LOGIN
    };
    this.headerService.notifyHeaderChange(headerMeta);
    this.username = '';    
    this.placeService.setCurrentLocation();
    this.router.navigateByUrl('/');
  }

  private setLogInInfo(user: GintaaUser) {
    const headerMeta = {
      hideHeader: false,
      headerType: HeaderType.AFTER_LOGIN
    };
    this.headerService.notifyHeaderChange(headerMeta);
    this.username = user.username;
    this.profileUrl = user.profileUrl;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
