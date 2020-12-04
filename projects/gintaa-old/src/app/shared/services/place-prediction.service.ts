import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';
import { } from 'googlemaps';
import { GooglePlaceResult } from '@gintaa/shared/modals';

@Injectable()
export class PlacePredictionService {
  public autocompleteService;

  constructor(private mapsAPILoader: MapsAPILoader) {

    this.mapsAPILoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
    });

  }

  // Wrapper for Google Places Autocomplete Prediction API, returns observable
  getPlacePredictions(term: string): Observable<any[]> {
    return Observable.create(observer => {
        // API Call
        // see below link for map developer API
        // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
        const request = {
          input: term,
          componentRestrictions: {country: 'in'},
          types: ['geocode']
        };
        this.autocompleteService.getPlacePredictions(request, (data: GooglePlaceResult[]) => {

        if (data) {
            //console.log(`Place predictions data: ${JSON.stringify(data)}`);
            observer.next(data);
            observer.complete();
        } else {
            observer.error(status);
        }

    });

  });

  }
}
