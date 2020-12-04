import { isPlatformBrowser } from '@angular/common';
import { EventEmitter, Inject, Injectable, Output, PLATFORM_ID } from '@angular/core';
import { UserProfileResponse } from '@gintaa/shared/modals';
import { CookieService } from '@gintaa/shared/services/cookie.service';
import { StorageService } from '@gintaa/shared/services/storage.service';
import { Subject } from 'rxjs';
import { GintaaUser } from './auth.user';

// export class SignInModel {
//   userName: string;
//   profileUrl: string;
// }

// export class ChatHeaderModel {
//   inChatRoom: boolean;
//   userName: string;
//   profileUrl: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() signInEvent: EventEmitter<any> = new EventEmitter();

  isLoggedIn: boolean;
  constructor (
    @Inject(PLATFORM_ID) private platformId: Object,
    private storageService: StorageService,
    private cookieService: CookieService
    ) {
        this.isLoggedIn = false;    
      }

  // setToken(isLoggedIn: boolean, token?: string, username?: string, profileUrl?: string): void {
  //   this.isLoggedIn = isLoggedIn;
  //   const gintaaUser = this.storageService.store;
  //   gintaaUser.username = username;
  //   gintaaUser.profileUrl = profileUrl;
  //   gintaaUser.accessToken = token;
  //   this.storageService.setStore(gintaaUser);
  //   if (isLoggedIn) {
  //     this.signInEvent.emit(this.getSignInInput());
  //   }
  // }
  
  setUsername(username: string): void {
    const user: GintaaUser = this.storageService.store;
    user.username = username;
    this.storageService.setStore(user);
    this.signInEvent.emit(this.getSignInInput());
  }

  setUserVerified(isVerified: boolean){
    const user: GintaaUser = this.storageService.store;
    user.isVerified = isVerified || false;
    this.storageService.setStore(user);
    this.signInEvent.emit(this.getSignInInput()); 
  }

  setProfileImage(url: string) {
    const user: GintaaUser = this.storageService.store;
    user.profileUrl = url;
    this.storageService.setStore(user);
    this.signInEvent.emit(this.getSignInInput());
  }

  clearAuthInfo(): void {
    this.storageService.clearStore();
  }

  public getAuthInfo(): any {
    return isPlatformBrowser(this.platformId) ? JSON.parse(localStorage.getItem('user')) : null;
  }

  isAuthenticated(): boolean {
    let isAuth = true;
    const user = isPlatformBrowser(this.platformId) ? localStorage.getItem('user') : null;
    if (user === 'null' || user == null) {
      isAuth = false;
    }
    return isAuth;
  }

  getSignInInput(): GintaaUser {
    return JSON.parse(localStorage.getItem('user'));
  }

  // getCustomHeaders(req: HttpRequest<any>, isSearchHistory: boolean): HttpHeaders {
  //   let headers: HttpHeaders = req.headers;
  //   if (isSearchHistory) {
  //     console.log('request.url url:::', req.url);
  //     if(req.url === 'history') {
  //         headers = req.headers.append('Cookie', `${this.cookieService.getCookie('history')}`)
  //     } else if(req.url === 'search') {
  //         headers = req.headers.append('Cookie', `${this.cookieService.getCookie('search')}`)
  //     } 
  //   } else {
  //       headers = req.headers.get('Cookie') ? req.headers.delete('Cookie') : req.headers;
  //   }
  //   return headers;
  // }

  // public getToken(): string {
  //   return this.storageService.store ? this.storageService.store.accessToken : null;
  // }

  // public getUsername(): string {
  //   return this.storageService.store ? this.storageService.store.username : null;
  // }

  public getProfileUrl(): string {
    return this.storageService.store ? this.storageService.store.profileUrl : null;
  }

  // public isAuthenticated(): boolean {
  //   const token = this.getToken();
  //   if (!token) {
  //     return false;
  //   }
  //   return true;
  // }

  // public getAuthInfo(): any {
  //   const username = this.getUsername();
  //   const token = this.getToken();
  //   const profileUrl = this.getProfileUrl();
  //   return {username, token, profileUrl};
  // }

  // getSignInInput(): SignInModel {
  //   const singInInput: SignInModel = {
  //     userName: this.getUsername(),
  //     profileUrl: this.getProfileUrl()
  //   };
  //   return singInInput;
  // }

  // ==========  MODIFIED FOR FIREBASE AUTH ========= //

  setFirebaseUser(user: firebase.User, token: string = "", expirationTime: string = "") {
    const userObject = this.storageService.store;
    const gintaaUser = userObject? userObject : new GintaaUser();
    gintaaUser.userId = user.uid;
    gintaaUser.phoneNo = user.phoneNumber;
    gintaaUser.username = user.displayName || user.phoneNumber || user.email;
    gintaaUser.providerData = user.providerData || {};
    gintaaUser.refreshtoken = user.refreshToken;
    gintaaUser.accessToken = token;
    gintaaUser.expirationTime = expirationTime;    
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setStore(gintaaUser);
    }
    this.signInEvent.emit(this.getSignInInput());
  }

  updateFirebaseUser(user: UserProfileResponse) {
    const gintaaUser = new GintaaUser();
    gintaaUser.userId = this.getSignInInput().userId;
    gintaaUser.phoneNo = user.mobile;
    gintaaUser.username = user.name || user.mobile;
    if(isPlatformBrowser(this.platformId)){
      this.storageService.setStore(gintaaUser);
    }
    this.signInEvent.emit(this.getSignInInput());
  }

  updateUserContactInfo(contact: string) {
    let gintaaUser: GintaaUser = this.getSignInInput();
    const oldPhoneNo = gintaaUser.phoneNo;
    let userName = gintaaUser.username.includes(oldPhoneNo) ? contact : gintaaUser.username;
    gintaaUser.phoneNo = contact;
    gintaaUser.username = userName || contact;
    if(isPlatformBrowser(this.platformId)){
      this.storageService.setStore(gintaaUser);
    }
    this.signInEvent.emit(this.getSignInInput());
  }

  setFirebaseLogin(login: boolean) {
    this.isLoggedIn = login;
    //return true;
  }

  getFirebaseLogin(): boolean {
    return this.isLoggedIn;
  }

  // clearFirebaseUser() {
  //   if(isPlatformBrowser(this.platformId)) {
  //     localStorage.setItem('user', null);
  //   }
 //}

  // private getChatHeaderInput(inChat: boolean): ChatHeaderModel {
  //   const chatHeaderInput: ChatHeaderModel = {
  //     userName: this.getUsername(),
  //     profileUrl: this.getProfileUrl(),
  //     inChatRoom: inChat
  //   };
  //   return chatHeaderInput;
  // }
}
