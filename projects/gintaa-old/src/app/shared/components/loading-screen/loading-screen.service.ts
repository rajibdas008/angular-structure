import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  constructor() { }

  private _loading: boolean = false;
  loadingStatus: Subject<boolean> = new Subject();

  get loading(): boolean {
    console.log("get loading: " + this._loading);
    return this._loading;
  }

  set loading(value) {
    console.log("set loading: " + value);
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    console.log("startLoading");
    this.loading = true;
  }

  stopLoading() {
    console.log("stopLoading");
    this.loading = false;
  }
}