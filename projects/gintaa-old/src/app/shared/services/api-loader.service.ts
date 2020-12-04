import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiLoaderService {

  public isLoading = new BehaviorSubject(false);
  constructor() { }
}
