import { Component, OnInit, NgZone } from '@angular/core';
import { PlaceService } from '@gintaa/shared';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-current-locations',
  templateUrl: './current-locations.component.html',
  styleUrls: ['./current-locations.component.scss']
})
export class CurrentLocationsComponent implements OnInit {

  keyword = 'name';
  currentAddr: FormControl = new FormControl();  
  suggestions: string[] = [
    'Kolkata', 'Mumbai', 'Delhi','Bangalore', 'Hyderabad', 'Chennai', 
    'Surat', 'Pune', 'Jaipur', 'Kanpur', 'Nagpur', 'Bhopal'
  ];
  filteredOptions: Observable<any[]>;

  constructor(
    public placeService: PlaceService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.placeService.currentCity$
    .subscribe((city: string) => {
      console.log('city:::', city);
      if(city) {
        this.currentAddr.patchValue(city);
        this.currentAddr.updateValueAndValidity();
      }      
    });

    // this.placeService.currentAddr$.subscribe(
    //   (ca) => {
    //     this.ngZone.run(() => {
    //       const city: string = ca.city;
    //       this.placeService.selectedCity(city);
    //       this.currentAddr.patchValue(city);
    //       this.currentAddr.updateValueAndValidity();
    //     });
    //   }
    // );

    this.filteredOptions = this.currentAddr.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.suggestions.filter(suggestion => suggestion.toLowerCase().includes(filterValue));
  }

  selectEvent(event: MatAutocompleteSelectedEvent) {
    // do something with selected item
    const city: string = event.option.value;
    this.placeService.selectedCity(city);
    this.currentAddr.setValue(city);
    this.currentAddr.updateValueAndValidity();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  useMyLoc(event: Event, trigger: MatAutocompleteTrigger) {
    event.stopPropagation();
    this.placeService.setCurrentLocation();
    //trigger.closePanel();
  }

  openPanel(event: Event, trigger: MatAutocompleteTrigger) {
    //const initialValue = this.currentAddr.value;
    event.stopPropagation();
    this.currentAddr.setValue('');
    this.currentAddr.updateValueAndValidity();
    trigger.openPanel();
    //this.currentAddr.setValue(initialValue);
    //this.currentAddr.updateValueAndValidity();
  }
}
