import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GeocodingService } from '@gintaa/shared/services/geocode.service';
import { GooglePlaceResult, Address, AddressResponse } from '@gintaa/shared/modals';
import { CommonHttpService, LocationService, SharedService, PlacePredictionService, PlaceService } from '@gintaa/shared';
import { Constants } from '@gintaa/constants';

@Component({
  selector: 'app-addlocation',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  @ViewChild('closeModalBtn', { static: false }) closeModalBtn: ElementRef;
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;

  public serverError = '';
  public selection: string;
  public customOption: string = '';
  offerAddress: any; 
  addressInput: AddressResponse;
  addresses: AddressResponse[];
  defaultAddress: AddressResponse;
  isAEProgress: boolean;
  isAddressSelected: boolean;
  isAddressTypeEnabled: boolean;
  isReadonly: boolean;
  editAddressId: string;
  googlePlacesResults: GooglePlaceResult[];

  constructor(
    private httpService: CommonHttpService,
    private ngZone: NgZone,
    private locationService: LocationService,
    private placePredictionService: PlacePredictionService,
    private geoCodeService: GeocodingService,
    private placeService: PlaceService,
    private sharedService: SharedService) {
      this.sharedService.offerDefaultAddressChange.subscribe(
        (address: AddressResponse) => {
            if (address) {
              this.offerAddress = address;
            }
        }
      ); 
    }

  ngOnInit() {
    this.serverError = '';
    this.defaultAddress = new AddressResponse();
    if (!this.offerAddress) {
      this.offerAddress = this.defaultAddress;
    }
    this.setAllAddress();
    this.addressInput = new AddressResponse();
    this.isAEProgress = false;
    this.isAddressSelected = false;
    this.isAddressTypeEnabled = false;
    this.isReadonly = false;
  }
  enableAddressType() {
    this.isAddressTypeEnabled = true;
    this.selection = this.customOption = this.serverError = '';
    this.isAddressSelected = false;
    this.isReadonly = true;
  }

  disableAddressType() {
    this.serverError = '';
    this.isAddressTypeEnabled = false;
    this.isAddressSelected = true;
    this.isReadonly = false;
  }

  isCheckedOnAL(address1: AddressResponse, address2: AddressResponse) {
    return address1.addressLine === address2.addressLine;
  }

  addressTypeChange(event: any) {
    //this.addressInput.annotation = event.value;
    this.serverError = '';
    this.customOption = '';
  }

  addAddress() {
    this.addressInput.annotation = this.selection !== Constants.OTHERS ? this.selection : this.customOption;
    if (!this.addressInput.annotation) {
      this.serverError = this.selection !== Constants.OTHERS ? Constants.PROVIDE_ADDRESS_TYPE : Constants.PROVIDE_OTHER_ADDRESS_TITLE;
      return;
    }
    this.httpService.addAddress(this.addressInput)
      .pipe(
        map(
          res => {
            const address = res.payload as Address;
            this.setAllAddress();
            this.disableAddressType();
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

  editAddress() {
    this.addressInput.annotation = this.selection !== Constants.OTHERS ? this.selection : this.customOption;
    if (!this.addressInput.annotation) {
      this.serverError = this.selection !== Constants.OTHERS  ? Constants.PROVIDE_ADDRESS_TYPE : Constants.PROVIDE_OTHER_ADDRESS_TITLE;
      // this.alertService.showMessage('Please provide address type');
      return;
    }
    this.addressInput.addressId = this.editAddressId;
    this.httpService.updateAddress(this.addressInput)
      .subscribe(
        address => {
          this.editAddressId = '';
          this.isAEProgress = false;
          this.addressInput = new AddressResponse();
          this.setAllAddress();
          this.disableAddressType()
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

  preEditAddress(address: AddressResponse) {
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
          this.isAddressSelected = false;
          this.isAddressTypeEnabled = true;
          this.isReadonly = true;
          this.editAddressId = address.addressId;
          this.addressInput = JSON.parse(JSON.stringify(address));
          this.googlePlacesResults = [];
        }
      );
  }

  setAllAddress() {
    this.addresses = [];
    this.openAddressModal();
    this.getAllUserAddress();
  }
  getAllUserAddress() {
    this.httpService.getAllAddress()
      .pipe(
        map(res => {
          if (res.payload) {
            this.addresses = res.payload || [];
          }
          return this.addresses;
        })
      )
      .subscribe(
        (addresses: AddressResponse[]) => {
          this.findDefaultAddress();
        },
        (errResponse) => {}
      );
  }

  deleteAddress(addressId: string) {
    this.httpService.deleteAddress(addressId)
      .subscribe(
        address => {
          this.setAllAddress();
        },
        err => {},
        () => {
          if(!this.addresses.length) {
            this.offerAddress.addressLine = '';
            this.defaultAddress.annotation = '';
          }
        }
      );
  }

  changeOfferDefaultAddress(addressId: string) {
    this.findAddressById(addressId)
      .subscribe(
        (address: AddressResponse) => {
          // this.setAllAddress();
          // this.findDefaultAddress();
          // this.offerAddress = address;
          this.defaultAddress = address;
          this.closeModalBtn.nativeElement.click();
          this.sharedService.offerDefaultAddressChange.next(address);
        },
        err => {}
      );
  }

  
  findAddressById(addressId: string): Observable<AddressResponse> {
    return from(this.addresses)
      .pipe(
        filter((address: AddressResponse) => address.addressId === addressId),
        map(addresses => addresses)
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
          //if (!this.offerAddress.addressLine) {
            this.offerAddress = this.defaultAddress;
            this.sharedService.offerDefaultAddressChange.next(address);
          //}
          // if (!this.serviceOfferAddress.addressLine) {
          //   this.serviceOfferAddress = this.defaultAddress;
          // }
        }
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

  openAddressModal() {
    this.addressInput = new AddressResponse();
    this.editAddressId = '';
    this.isAEProgress = false;
    this.isAddressSelected = false;
    this.isAddressTypeEnabled = false;
    this.isReadonly = false;
    this.googlePlacesResults = [];
  }

  onSearch(search: string) {
    if (search.length >= 5) {
        setTimeout(() => {
            this.placePredictionService.getPlacePredictions(search)
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
}
