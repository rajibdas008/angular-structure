import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-user',
  templateUrl: './track-user.component.html',
  styleUrls: ['./track-user.component.scss']
})
export class TrackUserComponent implements OnInit {

  constructor() { }
  latitude: number;
  longitude: number;
  zoom:number;
 
  ngOnInit() {
    this.setUserCurrentLocation();
  }
 
    // Get Current Location Coordinates
    private setUserCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 15;
        });
      }
    }
}
