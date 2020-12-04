import { 
  Component, 
  Input, 
  OnInit, 
  ViewChild,
  ElementRef, 
  NgZone
} from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { Constants } from '@gintaa/constants';
import { Address, AddressResponse } from '@gintaa/shared/modals';
import { } from 'googlemaps';
import { 
  PlacePredictionService,
  GeocodingService,
  PlaceService,
  LocationService,
  CommonHttpService,
  SharedService
} from '@gintaa/shared';
import { MatRadioChange } from '@angular/material';
import { Response, GooglePlaceResult  } from '@gintaa/shared/modals';


@Component({
  selector: 'app-add-profile-location',
  templateUrl: './add-profile-location.component.html',
  styleUrls: ['./add-profile-location.component.scss']
})
export class AddProfileLocationComponent implements OnInit {

  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;
  public serverError = '';
  public searchTerm: string;
  public selection: string;
  public customOption: string = '';

  addressInput: AddressResponse;
  addresses: AddressResponse[];
  defaultAddress: AddressResponse;
  isAEProgress: boolean;
  isAddressSelected: boolean;
  isAddressTypeEnabled: boolean;
  isReadonly: boolean;
  editAddressId: string;
  googlePlacesResults: GooglePlaceResult[];
  selectedIndex: number;
  showAddressSearch: boolean = false;

  constructor (
    private httpService: CommonHttpService,
    private ngZone: NgZone,
    private locationService: LocationService,
    private placePredictionService: PlacePredictionService,
    private geoCodeService: GeocodingService,
    private placeService: PlaceService,
    private sharedService: SharedService
    ) { }

  ngOnInit() {
    this.serverError = '';
    this.addressInput = new AddressResponse();
    this.defaultAddress = new AddressResponse();
    this.getAllUserAddress();
  }

  getAllUserAddress(address?: any) {
    this.httpService.getAllAddress()
      .pipe(
        tap(() => this.addresses = []),
        map(res => this.addresses = res.payload ? res.payload : [])
      )
      .subscribe(
        (addresses: AddressResponse[]) => {
          if(address){
            this.changeDefaultAddress(address.addressId, addresses.length);
          } else {
            this.findDefaultAddress();
          }
         
        },
        (errResponse) => {}
      );
  }

  findDefaultAddress() {
    return from(this.addresses)
      .pipe(
        filter((address: AddressResponse) => address.default),
        map(address => address)
      )
      .subscribe(
        (address: AddressResponse) => {
          this.defaultAddress = address || new AddressResponse();
        }
      );
  }

  showAddressTypeSection() {
    this.isAddressTypeEnabled = true;
    this.selection = this.customOption = this.serverError = '';
    this.isAddressSelected = false;
    this.isReadonly = true;
  }

  hideAddressTypeSection() {
    this.serverError = '';
    this.isAddressTypeEnabled = this.isReadonly = this.showAddressSearch = false;
  }

  resetAddressSearch() {
    this.isAddressTypeEnabled = this.isReadonly = false;
    this.showAddressSearch = this.isAddressSelected = true;
    this.serverError = '';
  }

  isCheckedOnId(address1: AddressResponse, address2: AddressResponse, index: number) {
    if(address1.addressId && address2.addressId && !this.isAddressTypeEnabled) {
      return address1.addressId === address2.addressId;
    }
    return this.selectedIndex === index;
  }

  addressTypeChange(event: MatRadioChange) {
    this.serverError = '';
    this.customOption = '';
  }
  
  saveAddress() {    
    this.addressInput.annotation = this.selection !== Constants.OTHERS ? 
      this.selection : this.customOption;
    if (!this.addressInput.annotation) {
      this.serverError = this.selection !== Constants.OTHERS ? Constants.PROVIDE_ADDRESS_TYPE : Constants.PROVIDE_OTHER_ADDRESS_TITLE;
      return;
    }
    this.httpService.addAddress(this.addressInput)
      .pipe(
        map(
          (res: Response) => {
            const address = res.payload as Address;
            this.getAllUserAddress(address);
            this.hideAddressTypeSection();
            return address.addressLine;
          }
        )
      )
      .subscribe(
        addressStr => {
          this.addressInput = new AddressResponse();
        },
        errorResponse => {
          // this.alertService.showMessage(`Fail to add address`);
          if (errorResponse.error
            && !errorResponse.error.success && errorResponse.error.payload) {

          // [{"param":"name","reason":"Offer name must be between 10 and 300 characters long"}]
          const payload = errorResponse.error.payload;

          if (payload instanceof Array) {
            errorResponse.error.payload.forEach(
              (obj) => {
                const name = obj.param;
                const reason = obj.reason;
                this.serverError = reason;
              }
            );
          } else if (payload instanceof Object) {
            const param = payload.param;
            const reason = payload.reason;
            if (param && reason) {
              this.serverError = reason;
            }
          }
        }
        }
      );
  }

  updateAddress() {
    this.addressInput.annotation = this.selection !== Constants.OTHERS ? this.selection : this.customOption;
    if (!this.addressInput.annotation) {
      this.serverError = this.selection !== Constants.OTHERS ? Constants.PROVIDE_ADDRESS_TYPE : Constants.PROVIDE_OTHER_ADDRESS_TITLE;
      // this.alertService.showMessage('Please provide address type');
      return;
    }
    this.addressInput.addressId = this.editAddressId;
    this.httpService.updateAddress(this.addressInput)
      .subscribe(
        address => {
          this.editAddressId = null;
          this.isAEProgress = false;
          this.addressInput = new AddressResponse();
          this.getAllUserAddress();
          this.hideAddressTypeSection();
        },
        errorResponse => {
           // this.alertService.showMessage(`Fail to add address`);
           if (errorResponse.error
            && !errorResponse.error.success && errorResponse.error.payload) {

          // [{"param":"name","reason":"Offer name must be between 10 and 300 characters long"}]
          const payload = errorResponse.error.payload;

          if (payload instanceof Array) {
            errorResponse.error.payload.forEach(
              (obj) => {
                const name = obj.param;
                const reason = obj.reason;
                this.serverError = reason;
              }
            );
          } else if (payload instanceof Object) {
            const param = payload.param;
            const reason = payload.reason;
            if (param && reason) {
              this.serverError = reason;
            }
          }
         }
        }
      );
  }

  preEditAddress(address: AddressResponse, index: number) {
    console.log('hello::::::', index);
    this.selectedIndex = index;
    this.serverError = '';
    this.selection = address.annotation
    if(address.annotation !== Constants.HOME && address.annotation !== Constants.OFFICE) {
      this.selection = Constants.OTHERS;
      this.customOption = address.annotation;
    }
    this.findAddressById(address.addressId)
      .subscribe(
        address => {
          this.isAEProgress = true;
          this.showAddressSearch = true;
          this.isAddressSelected = false;
          this.isAddressTypeEnabled = true;
          this.isReadonly = true;
          this.editAddressId = address.addressId;
          this.addressInput = JSON.parse(JSON.stringify(address));
          this.googlePlacesResults = [];
        }
      );
  }

  
  

  deleteAddress(addressId: string) {
    this.httpService.deleteAddress(addressId)
      .subscribe(
        (address: any) => {
          console.log('Deleted Address::', address);
          let offerAddress: AddressResponse = this.sharedService.offerDefaultAddressChange.getValue();
          if(offerAddress.addressId === addressId) {
            this.sharedService.offerDefaultAddressChange.next({});
          }
          this.getAllUserAddress();
        },
        err => {}
      );
  }

  

  changeDefaultAddress(addressId: string, index: number) {
    this.selectedIndex = index;
    this.findAddressById(addressId)
        .pipe(
          switchMap(address => {
              //address.default = true;
              return this.httpService.changeDefaultAddress(address);
            }
          )
        )
      .subscribe(
        (address: any) => {
          this.getAllUserAddress();
          this.findDefaultAddress();
        },
        err => { }
      );
  }

  findAddressById(addressId: string): Observable<AddressResponse> {
    return from(this.addresses)
          .pipe(
            filter((address: AddressResponse) => address.addressId === addressId),
            map(address => address),
            tap(console.log)
          );
  }

  
  useMyLoc() {
    from(this.locationService.getPosition()).
    subscribe(
      (position) => {
        const latLng = new google.maps.LatLng(position.lat, position.lng);
        this.geoCodeService.geocode(latLng)
        .subscribe(
          (currentAddressResults: google.maps.GeocoderResult[]) => {
            const currentAddressResult = currentAddressResults[0];
            this.addressInput.addressLine = currentAddressResult.formatted_address;
            this.extractPlaceDetails(currentAddressResult);
          }
        );
      }
    );
  }

  onSearch(term: string) {
    this.searchTerm = term;
    if (this.searchTerm.length >= 5) {
        setTimeout(() => {
            this.placePredictionService.getPlacePredictions(term)
            .subscribe(
              (response: GooglePlaceResult[]) => this.googlePlacesResults = response
            );
        }, 100);
    }
  }

  suggestionSelected(prediction: GooglePlaceResult) {
    this.addressInput.addressLine = prediction.description;
    this.placeService.getPlaceDetails(prediction.place_id)
    .subscribe(
      (placeDetails: google.maps.places.PlaceResult) => {
        this.extractPlaceDetails(placeDetails);
      }
    );
  }

  extractPlaceDetails(place: any) {
    this.ngZone.run(() => {
      // flatNo, landmark remaining
      this.isAddressSelected = !this.isAddressTypeEnabled;
      this.isReadonly = false;
      if (this.isAddressTypeEnabled) {
        this.isReadonly = true;
      }
      this.googlePlacesResults = [];

      const {annotation, addressLine} = this.addressInput;
      this.addressInput = new AddressResponse();
      this.addressInput.annotation = annotation;
      this.addressInput.addressLine = addressLine;
      this.addressInput.lat = place.geometry.location.lat();
      this.addressInput.lng = place.geometry.location.lng();
      place.address_components.forEach(addComp => {
        const types: any[] = addComp.types;
        types.forEach(type => {
          if (type === 'country') {
            this.addressInput.country = addComp.long_name;
          }
          if (type === 'postal_code') {
            this.addressInput.zip = addComp.long_name;
          }
          if (type === 'administrative_area_level_1') {
            this.addressInput.state = addComp.long_name;
          }
          if (type === 'administrative_area_level_2') {
            this.addressInput.area = addComp.long_name;
          }
          if (type === 'locality') {
            this.addressInput.city = addComp.long_name;
          }
          if (type === 'premise') {
            this.addressInput.flatNo = addComp.long_name;
          }
          if (type === 'sublocality') {
            this.addressInput.landmark = addComp.long_name;
          }
        });
      });

      // TODO: need to remove validations from server side
      if (!this.addressInput.city) {
        this.addressInput.city = 'NA';
      }
      if (!this.addressInput.area) {
        this.addressInput.area = 'NA';
      }
      if (!this.addressInput.flatNo) {
        this.addressInput.flatNo = 'NA';
      }
      if (!this.addressInput.zip) {
        this.addressInput.zip = '700000';
      }
      if (!this.addressInput.landmark) {
        this.addressInput.landmark = 'NA';
      }
    });
  }

  addNewAddress() {
    this.showAddressSearch = true;
    this.addressInput.addressLine = '';
  }
}
