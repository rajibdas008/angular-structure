import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrentLocation, GintaaJunction, DealResponseErrorObj, AGMMapMarker } from '@gintaa/shared/modals';
import { DealService } from '@gintaa/shared/services/deal.service';
import { MatDatepickerInputEvent, MatRadioChange } from '@angular/material';
import Moment from 'moment';

interface InjectedData {
  location: CurrentLocation;
  offerOwnerName: string;
}

@Component({
  selector: 'app-junctions-meet',
  templateUrl: './junctions-meet.component.html',
  styleUrls: ['./junctions-meet.component.scss']
})
export class JunctionsMeetComponent implements OnInit {

  currentLocation: CurrentLocation;
  offerOwnerName: string;
  gintaJunctions: GintaaJunction[];
  selectedJunctionDetails: GintaaJunction;
  showAllJunctionPanel = true;
  selectedGintaaJunctionId: any;
  showLoader = false;
  noGintaaJunctionsAvailableMessage = 'No Junctions Found';
  initialMeetingDate: any;
  minimumDate: any;
  dateTimePicker = {
    showSpinners: true,
    showSeconds: true,
    stepHour: 1,
    stepMinute: 1,
    stepSecond: 5,
    touchUi: false,
    color: 'primary', // accent | warn | primary
    hideTime: false,
  };

  // get directions and save
  origin = { lat: 22.67, lng: 88.00 };
  destination = { lat: 22.580311, lng: 88.428932 };
  kolkataCoords = { lat: 22.580311, lng: 88.3541618 };
  focusedMapCoords: any = null;
  openedWindow: string;
  travelMode = 'DRIVING'; // BICYCLING, DRIVING, TRANSIT, WALKING
  showMapDirection = true;

  zoom = 8;
  mapMarkers: AGMMapMarker[] = [];
  demoMarkers: AGMMapMarker[] = [
    {
      lat: '22.580311',
      lng: '88.428932',
      label: 'G'
    },
    {
      lat: '22.516550',
      lng: '88.335190',
      label: 'G'
    },
    {
      lat: '22.565570',
      lng: '88.370210',
      label: 'G'
    },
    {
      lat: '22.570180',
      lng: '88.372900',
      label: 'G'
    }
  ];
  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };

  logConsole = true;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  searchText = '';

  constructor(
    public dialogRef: MatDialogRef<JunctionsMeetComponent>,
    @Inject(MAT_DIALOG_DATA) public dealStateFromDialog: InjectedData,
    private dealService: DealService) {
      this.mapMarkers = [];
      if (dealStateFromDialog) {
        this.currentLocation = { ...dealStateFromDialog.location };
        this.offerOwnerName = dealStateFromDialog.offerOwnerName;
        if (this.currentLocation.available) {
          // call the getGintaaJunctions API
          this.showAllJunctionPanel = false;
          this.mapMarkers.push({
            draggable: false,
            label: 'H',
            lat: this.currentLocation._lat,
            lng: this.currentLocation._lng,
            name: 'Home',
          });
          this.origin = { lat: this.formatLatLng(this.currentLocation._lat), lng: this.formatLatLng(this.currentLocation._lng) };
          this.getJintaaJunctions(this.currentLocation._lat, this.currentLocation._lng);
        } else {
          // kolkata lat long based on google - 22.6763857, 88.0495425
          this.showAllJunctionPanel = true;
          this.showMapDirection = false;
          this.origin = { ...this.kolkataCoords };
          this.currentLocation = null;

          // call getAllGintaaJunctions API
          this.getJintaaJunctions(this.kolkataCoords.lat, this.kolkataCoords.lng);
        }
      }
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    // update initial meeting time
    this.updateInitialMeetingTime();
  }

  getJintaaJunctions(lat: any, lng: any) {
    this.showLoader = true;
    this.dealService.getJintaaJunctions(lat, lng).subscribe((res: any) => {
      console.log('[JINTAA JUNCTIONS] ', res);
      this.showLoader = false;
      if (res.code === 200 && res.payload) {
        this.gintaJunctions = [...res.payload];

        // setting up all the gintaa junction markers
        res.payload.forEach(junction => {
          this.mapMarkers.push({
            id: junction.id,
            lat: junction.latitude,
            lng: junction.longitude,
            name: junction.name,
            draggable: false,
            label: 'G',
          });
        });
        this.triggerSetSelectedJunction();
      }
    }, error => {
      this.showLoader = false;
      if (error && error.error) {
        this.setErrorObject(error.error);
      }
    });
  }

  triggerSetSelectedJunction() {
    if (this.gintaJunctions.length > 0) {
      this.setJunctionDetails(this.gintaJunctions[0]);
    }
  }

  // onchnage event on gintaa junction radio
  chooseJunction(event: MatRadioChange, junction: GintaaJunction) {
    if (event.value) {
      this.setJunctionDetails(junction);
    }
  }

  // onchnage event on gintaa junction radio for all junctions
  focusJunction(event: MatRadioChange, junction: GintaaJunction) {
    if (event.value) {
      // need to find a way to zoom into that area
      this.focusedMapCoords = {
        lat: junction.latitude,
        lng: junction.longitude
      };
      this.zoom = 12;
      this.openedWindow = junction.id;
    }
  }

  setJunctionDetails(junction: GintaaJunction) {
    console.log('Selected JUNCTION -- ', junction);
    this.selectedJunctionDetails = {
      ...junction,
      openTime: junction.openTime ? this.formatJunctionOpenCloseTime(junction.openTime) : '',
      closeTime: junction.closeTime ? this.formatJunctionOpenCloseTime(junction.closeTime) : '',
    };

    // show route for selected junction
    this.selectedGintaaJunctionId = junction.id;
    this.openedWindow = junction.id;
    if (!this.showAllJunctionPanel) {
      this.destination = { lat: this.formatLatLng(junction.latitude), lng: this.formatLatLng(junction.longitude) };
      this.updateZoomLevel(junction.distance);
    } else {
      this.showMapDirection = false;
    }

    // update initial meeting time
    this.updateInitialMeetingTime(junction.openTime);
  }

  updateInitialMeetingTime(opentime: string = '') {
    let openHour = 9;
    let openMinute = 0;
    if (opentime) {
      openHour = parseInt(opentime.split(':')[0], 10);
      openMinute = parseInt(opentime.split(':')[1], 10);
    }

    const currentdate = new Date();
    this.initialMeetingDate = new Date(
      currentdate.getFullYear(),
      parseInt((currentdate.getMonth()).toString().padStart(2, '0'), 10),
      currentdate.getDate(),
      openHour, openMinute, 0);
    this.minimumDate = this.initialMeetingDate;
  }

  setMeetingDate(event: any) {
    if (event.value) {
      // this.initialMeetingDate = Moment(event.value).format('DD/MM/YYYY, hh:mm:ss');
      // new Date(year, month, day, hours, minutes, seconds, milliseconds)
      this.initialMeetingDate = new Date(
        parseInt(Moment(event.value).format('YYYY'), 10),
        parseInt(Moment(event.value).format('MM'), 10) - 1,
        parseInt(Moment(event.value).format('DD'), 10),
        parseInt(Moment(event.value).format('hh'), 10),
        parseInt(Moment(event.value).format('mm'), 10),
        parseInt(Moment(event.value).format('ss'), 10),
      );
      if (this.logConsole) { console.log('updated meeting date: ', this.initialMeetingDate); }
    }
  }

  updateZoomLevel(distance: number) {
    // this is not a good solution
    // this approach is slower for performance as well -- avg 35ms
    let zoom = 8;
    switch (true) {
      case (distance <= 50):
        zoom = 3;
        break;

      case (distance <= 100):
        zoom = 4;
        break;

      case (distance <= 200):
        zoom = 5;
        break;

      case (distance <= 300):
        zoom = 7;
        break;

      case (distance <= 500):
        zoom = 8;
        break;

      case (distance > 500):
        zoom = 8;
        break;

      default:
        zoom = 8;
        break;
    }
  }

  generateGoogleMapLink() {
    const coordsIndex = Math.floor(Math.random() * Math.floor(3));
    const lat = (this.selectedJunctionDetails.latitude) ? this.selectedJunctionDetails.latitude : this.demoMarkers[coordsIndex].lat;
    const lng = (this.selectedJunctionDetails.longitude) ? this.selectedJunctionDetails.longitude : this.demoMarkers[coordsIndex].lng;

    // If it's an iPhone..
    if ( (navigator.platform.indexOf('iPhone') !== -1)
        || (navigator.platform.indexOf('iPod') !== -1)
        || (navigator.platform.indexOf('iPad') !== -1)) {
          window.open(`maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${lng}`);
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${lat},${lng}`);
    }
  }

  formatLatLng(pos: any) {
    return parseFloat(pos);
  }

  formatJunctionOpenCloseTime(junctionTime: string): string {
    // expecting in 24 hour format - 01:00:00
    let time = junctionTime.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [junctionTime];
    if (time.length > 1) {
      time = time.slice (1);
      time[4] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = String(+time[0] % 12 || 12);
    }
    return time.join('');
  }

  closeGintaaJuctionModal(selected: boolean = true) {
    if (!selected) {
      this.dialogRef.close({
        selectedGintaaJunction: null,
        meetingDateTime: null,
      });
    } else {
      this.dialogRef.close({
        selectedGintaaJunction: this.selectedGintaaJunctionId,
        meetingDateTime: this.initialMeetingDate,
      });
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  setErrorObject(error: DealResponseErrorObj) {
    console.log('[Guncations] error:', error);
    let errorMsg = error.message;
    if (!error.message) {
      if (error.payload[0]) {
        errorMsg = error.payload[0].errorDetailedReason;
      } else if (error.payload.errorDetailedReason) {
        errorMsg = error.payload.errorDetailedReason;
      }
    }
    this.responseErrorObject = {
      ...this.responseErrorObject,
      showError: true,
      code: error.code,
      message: errorMsg
    };
  }

  resetErrorObject() {
    this.responseErrorObject = {
      ...this.responseErrorObject,
      showError: false,
      code: 200,
      message: ''
    };
  }

  getMapLat() {
    const lat = this.focusedMapCoords ? this.focusedMapCoords.lat : this.kolkataCoords.lat;
    return this.currentLocation ? this.currentLocation._lat : lat;
  }

  getMapLng() {
    const lng = this.focusedMapCoords ? this.focusedMapCoords.lng : this.kolkataCoords.lng;
    return this.currentLocation ? this.currentLocation._lng : lng;
  }

  getZoom() {
    return this.zoom;
  }

  isInfoWindowOpen(id: string) {
    if (!id) {
      return false;
    }
    return this.openedWindow === id;
  }

}
