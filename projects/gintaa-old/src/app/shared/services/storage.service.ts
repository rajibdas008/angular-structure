import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { GintaaUser } from '@gintaa/shared/services/auth/auth.user';
import { isPlatformBrowser } from '@angular/common';
import uid from 'uid';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,) { }

  setStore(user: GintaaUser) {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  get store(): GintaaUser {
    return isPlatformBrowser(this.platformId) ? JSON.parse(localStorage.getItem('user')) : null;
  }

  // updateStore() {
  //   // const user: GintaaUser = this.store;
  //   // const gintaaUser: GintaaUser = new GintaaUser();
  //   //gintaaUser.deviceId = user ? user.deviceId : uid();  
  //   this.clearStore();
  //   //this.setStore(gintaaUser);
  // }

  clearStore() { 
    if(isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }
}
