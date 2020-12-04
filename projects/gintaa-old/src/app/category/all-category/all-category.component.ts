import { NestedTreeControl } from '@angular/cdk/tree';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit, Component,




  Inject, OnDestroy, OnInit,




  PLATFORM_ID, Renderer2
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Constants } from '@gintaa/constants';
import { SearchCategory, SearchResponse } from '@gintaa/shared/modals';
import { CategoryService, SharedService } from '@gintaa/shared';
import { ChangeContext } from 'ng5-slider';
import { Subscription } from 'rxjs';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.scss']
})


export class AllCategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  private subsciption$: Subscription;
  searchText: string = null;  
  treeControl = new NestedTreeControl<SearchCategory>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SearchCategory>();
  isBrowser: boolean;

  constructor(
    public categoryService: CategoryService,
    private renderer: Renderer2,
    private sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object,
    ) { 
      this.isBrowser = isPlatformBrowser(this.platformId);
      this.categoryService.categoryDetails$.subscribe((res: SearchResponse) => {
        if(res) {
          this.dataSource.data = res.categories;         
        }
      });
    }

  hasChild = (_: number, node: SearchCategory) => !!node.children && node.children.length > 0;

  ngOnInit() {
    this.subsciption$ = this.sharedService.searchCriteriaChangeEvent
      .subscribe(
        (searchText: string) => {
          this.searchText = searchText;
        }
      );
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    this.subsciption$.unsubscribe();
  }

  selectedItem(primaryFacet: string, secondaryFacet: any, event: any) {
    const categoryVal: string = `${primaryFacet}_${secondaryFacet.key}`;
    // if (!event.target.classList.contains('highlighted')) {
    //     this.renderer.addClass(event.target, 'highlighted');
    //     this.categoryService.addQueryParamList(categoryVal);
    // } else {
    //     this.renderer.removeClass(event.target, 'highlighted');
    //     this.categoryService.removeFromQueryParamList(categoryVal);
    // }
    // this.categoryService.sendSelectedCategory();
  }

  toggleItem(primaryFacet: string, secondaryFacet: any, event: MatCheckboxChange) {
    const categoryVal: string = `${primaryFacet}_${secondaryFacet.key}`;
    if (event.checked) {
      this.categoryService.addQueryParamList(categoryVal);
    } else {
      this.categoryService.removeFromQueryParamList(categoryVal);
    }
   this.categoryService.sendSelectedCategory();
  }

  exists(primaryFacet: string, secondaryFacet: any) {
    const item: string = `${primaryFacet}_${secondaryFacet.key}`;
    return this.categoryService.paramList.indexOf(item) > -1;
  }

  onUserChangeStart(changeContext: ChangeContext): void {
    //this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
  }

  onUserChange(changeContext: ChangeContext): void {
    //this.getChangeContextString(changeContext);
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    const rangeValue: string = this.getChangeContextString(changeContext);
    this.categoryService.removeOldPriceFromQueryParam();
    this.categoryService.addQueryParamList(rangeValue);
    this.categoryService.sendSelectedCategory();
  }

  getChangeContextString(changeContext: ChangeContext): string {
    // return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
    //        `value: ${changeContext.value}, ` +
    //        `highValue: ${changeContext.highValue}}`;
    this.categoryService.setFloorPrice(changeContext.value);
    this.categoryService.setCeilPrice(changeContext.highValue);
    return `Price_${changeContext.value}-${changeContext.highValue}`;
  }

  itemSelectionToggle(node: SearchCategory): void {
    console.log('node details::', node);
  }

  itemSelectionLeafNode(node: SearchCategory): void {
    console.log('node details leaf node::', node);
    const categoryId: string = node.categoryId;
    this.categoryService.setCategoryId(categoryId);
    this.categoryService.sendSelectedCategory();
  }

  resetAllFilter() {
    this.categoryService.index = 1;
    this.categoryService.setFloorPrice(null);
    this.categoryService.setCeilPrice(null);
    this.categoryService.setCategoryId(null);
    this.categoryService.categoryDetails(this.categoryService.getSearchText(), null, this.categoryService.getCurrentIndex(), Constants.PAGE_SIZE);
    this.categoryService.clearParamList();
    this.categoryService.setInitialPrice(this.categoryService.floorPrice, this.categoryService.ceilPrice);  
  }



  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;  
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }



 







}
