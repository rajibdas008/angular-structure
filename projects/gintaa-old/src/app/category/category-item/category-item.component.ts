import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService, SharedService } from '@gintaa/shared';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit, OnDestroy {

  searchText: string;
  // subsciption$: Subscription
  constructor(
    private sharedService: SharedService,
    public categoryService: CategoryService) { }

  ngOnInit() { }

  ngOnDestroy() {
    // this.subsciption$.unsubscribe();
  }

  loadMoreItems() {
    this.categoryService.addIndex();
  }
}
