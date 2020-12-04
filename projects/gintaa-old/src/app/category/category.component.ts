import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, debounceTime, tap, takeUntil } from 'rxjs/operators';
import { SharedService, CategoryService } from '@gintaa/shared';
import { Subject } from 'rxjs';
import { Constants } from '../constants';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  // searchText: string;
  private componentDestroyed$: Subject<void> = new Subject<void>();
  isLoggedIn = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.activatedRoute.queryParams
    .pipe(
      takeUntil(this.componentDestroyed$)
      )
    .subscribe(
        (params: Params) => {
          const searchText: string = params.searchText || null;
          this.categoryService.setSearchText(searchText);
          this.categoryService.index = 1;
          // this.categoryService.searchResult.length = 0;  
          this.sharedService.searchCriteriaChangeEvent.next(searchText);
          this.categoryService.categoryDetails(searchText, null, this.categoryService.getCurrentIndex(), Constants.PAGE_SIZE);
          this.categoryService.clearParamList();
       }
    );

    this.categoryService.selectedCategoryLists$
       .pipe(
        tap((val) => console.log('selectedCategoryLists$ call executed' , val)),
         debounceTime(800),
         map
         (
           (queryParams: string) => {
             const queryParamArr: string[] = queryParams.split('~');
             const optionalQueryParam: string = this.categoryService.modifyQueryParams(queryParamArr[1]);
             const searchText: string = queryParamArr[0] !== 'null' ? queryParamArr[0] : null;
             this.categoryService.categoryDetails(searchText, optionalQueryParam,
             this.categoryService.getCurrentIndex(), Constants.PAGE_SIZE);
           }
          ),
         takeUntil(this.componentDestroyed$)
       )
       .subscribe();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();

    this.sharedService.clearSearchText.next('');
  }
}
