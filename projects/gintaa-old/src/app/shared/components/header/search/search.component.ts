import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryService, CommonHttpService, SharedService } from '@gintaa/shared';
import { Constants } from '@gintaa/constants';
import { SearchSuggestion } from '@gintaa/shared/modals';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
//import { GtagCategory, GtagAction } from '@gintaa/common/module/gtag/gtag.interfaces';
// import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

  // gtagCategory = GtagCategory;
  // gtagAction = GtagAction;
  // gtagParam = { event_label: 'Clicked on Search button' };

  //@ViewChild('auto', { static: false }) auto1: ElementRef<HTMLElement>;
  @ViewChild('autoComplete', { static: false }) auto: any;
  @ViewChild('matOption', { static: false }) optionRef: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLElement>;

  @Input('matAutocomplete') autocomplete: MatAutocompleteTrigger;
  private componentDestroyed$: Subject<void> = new Subject<void>();
  searchPlaceholder: string = Constants.SEARCH_PLACEHOLDER;
  searchForm: FormGroup;
  filteredOptions: Observable<SearchSuggestion[]>;
  isSearchDisabled = true;

  //@Input() value: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: CommonHttpService,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }  

  ngOnInit() {
    // this.analytics.logEvent('search001-test');

    this.searchForm = new FormGroup({
      'searchBox' : new FormControl(null, [Validators.required, Validators.minLength(2)])
    });

    this.route.queryParams.subscribe((params: Params) => {      
      if(!Object.keys(params).length) {
        this.searchForm.reset();
      }
    })

     this.sharedService.searchCriteriaChangeEvent
     .subscribe(
       (searchText: string) => {
         console.log('Text Now:::', searchText);
         this.searchForm.get('searchBox').setValue(searchText);
         this.searchForm.get('searchBox').updateValueAndValidity();
         //this.suggestion = new FormControl(searchText);
       }
     );

    // this.filteredOptions = this.searchForm.get('searchBox').valueChanges
    // .pipe(
    //   // startWith(''),
    //   map(value => value),
    //   debounceTime(Constants.DEBOUNCE_TIME),
    //   distinctUntilChanged(),
    //   switchMap((search: string) => this.loadSuggestions(search)),
    //   takeUntil(this.componentDestroyed$)
    // );

     this.sharedService.clearSearchText.subscribe(
        (str) => {
          this.searchForm.get('searchBox').patchValue('');
        }
      );
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.searchInput.nativeElement, 'focus')
    .pipe(
      map(event => event.target.value),
      switchMap(value => this.loadSuggestions(value)),      
      first()
    ).subscribe(res => {
      console.log('response 1232323', res);
      this.filteredOptions = of(res)
    })

    fromEvent<any>(this.searchInput.nativeElement, 'keyup')
    .pipe(
      map(event => event.target.value),
      debounceTime(Constants.DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap((search: string) => this.loadSuggestions(search)),
      takeUntil(this.componentDestroyed$)
    ).subscribe(res => {
      this.filteredOptions = of(res)
    })
  }


  // search(text: string) {
  //   this.keyUp.next(text);
  // }

  // selectEvent(item: any) {
  //   // do something with selected item
  //   if (this.auto) { this.auto.close(); }
  //   this.router.navigate(['/category'], { queryParams: { searchText: item.name }});
  // }

  // onChangeSearch(search: string) {
  //   // fetch remote data from here
  //   // And reassign the 'data' which is binded to 'data' property.
  //   if (!!search) {
  //     this.suggestions$ = of(search)
  //     .pipe(
  //       // startWith(''),
  //       map((res: string) => res),
  //       tap(() => {
  //         console.log('Tapping:::::::');
  //         this.suggestions = [];}),
  //       distinctUntilChanged(),
  //       switchMap((search: string) => this.loadSuggestions(search)),
  //       takeUntil(this.componentDestroyed$)
  //     );
  //     // .subscribe(
  //     //   (res) => {
  //     //     this.suggestions = [];
  //     //     if(res) {
  //     //       res.forEach((item: any) => {
  //     //         this.suggestions.push({
  //     //           name: item
  //     //         })
  //     //       })
  //     //     } else {
  //     //       this.itemNotFound = true;
  //     //     }
  //     //     this.auto.open();
  //     //   },
  //     //   (errorResponse) => { }
  //     // );
  //   }

  // }


  search() {
    const searchVal: string = this.searchForm.get('searchBox').value;
    if(searchVal && searchVal.length >=3) {
      this.navigateToCategoryPage();
    }
  }

  addClass(element: HTMLElement) {
    if(this.authService.isAuthenticated()) {
      element.classList.add('search-input-focus');
    }   
  }

  removeClass(element: HTMLElement) {
    element.classList.remove('search-input-focus');
  }

  loadSuggestions(search: string): Observable<SearchSuggestion[]> {
    console.log('loadSuggestion', search)
    this.isSearchDisabled = true;
    if(search.length >=3) {
      this.isSearchDisabled = false;
      return this.httpService.getSuggestion(search)
        .pipe(
          // map(res => res['payload'] ?  this.convertToObj(res['payload']) : null)
          map(res => res.payload ?  res.payload : null)
        );
    } else if(!search) {
      return this.httpService.getSearchHistory()
        .pipe(
          map(res => res.payload ?  this.uniqueResult(res.payload) : null),
        );
    } 
    return of([]);    
  }

  uniqueResult(res): SearchSuggestion[] {
    const unique: SearchSuggestion[] = [... new Map(res.map(item => [item.searchText.toLowerCase(), item])).values()];  // (arr.map(item => [item.id, item])).values()
    return unique;
  }

  // convertToObj(response: string[]): Observable<any> {
  //   // this.auto.open();
  //   this.suggestions = [];
  //   response.forEach((item: any) => {
  //     this.suggestions.push({
  //       name: item
  //     });
  //   });
  //   return of(this.suggestions);
  // }

  navigateToCategoryPage() {
    this.categoryService.setCategoryId(null);
    if(this.searchForm.get('searchBox').value === this.categoryService.getSearchText()) {
      console.log('Match');
    }
    this.searchForm.get('searchBox').value ? 
      this.router.navigate(['/category'], { 
        queryParams: { 
          searchText: this.searchForm.get('searchBox').value 
        }
      })
    : this.router.navigate(['/category']);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
   }

  //  optionSelected(selected: boolean, value: string) {
  //   this.router.navigate(['/category'], { queryParams: { searchText: value }});
  //  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    console.log('Event:::', event.option.value);
    const searchVal: string = event.option.value.title || event.option.value.searchText;
    console.log('Event searchVal:::', searchVal);
    this.searchForm.get('searchBox').setValue(searchVal);
    this.searchForm.get('searchBox').updateValueAndValidity();
    const categoryId: string = event.option.value.categoryId;
    this.categoryService.setCategoryId(categoryId);
    this.router.navigate(['/category'], { queryParams: { searchText: searchVal }});
   }
}

