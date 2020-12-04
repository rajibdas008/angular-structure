import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent, MatChipSelectionChange } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { OfferService, CommonHttpService, SharedService } from '@gintaa/shared';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@gintaa/shared/modals';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})



export class ChipListComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  addOnBlurTagInput = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl: FormControl = new FormControl();
  addTagCtrl: FormControl = new FormControl();
  categories: any[] = [];
  allCategoriesTags: any[] = [];
  allCategoriesDraftTags: any[] = [];
  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('addTagInput', { static: false }) addTagInput: ElementRef<HTMLInputElement>;
  addTagPresent: boolean;
  allCategories$: Observable<any>;
  rootCategoryResponse: any
  allTags$: Observable<any>;
  itemTagPresent: boolean;
  tagValues: any;
  @Input('type') chipType: string;
  customTags: string[] = []
  @Output() selectedCustomTag = new EventEmitter<string[]>();

  // @ViewChild('chip', { static: false }) chip: ElementRef<MatChip>; 
  // categories: Category[] = [
  //   {name: 'Lemon'},
  //   {name: 'Lime'},
  //   {name: 'Apple'},
  // ];

  constructor(
    public sharedService: SharedService,    
    private httpService: CommonHttpService,
    private offerService: OfferService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {    
    this.route.data.subscribe((data: { offerData: Offer }) => {
      const draftOfferDetails: Offer = data.offerData;
      if (draftOfferDetails && draftOfferDetails.category && draftOfferDetails.category.categoryId) {
        console.log('Category:::', draftOfferDetails.category);
        console.log('Facets:::', draftOfferDetails.facets);
        let {hierarchy, leafNode, tags, vertical} = draftOfferDetails.category;
        this.categories = leafNode ?  hierarchy.map(item=> ({ ...item, leafNode: !leafNode })) 
                                  : hierarchy.map(item=> ({ ...item, leafNode }));
        this.categories = [{categoryId: vertical.id,  label: vertical.label, leafNode: false}, ...this.categories];                                  
        let { [this.categories.length -1]: last } = this.categories;
        let categoryId = last.categoryId;
        if(leafNode) { 
          last.leafNode = leafNode;
        }
        if(this.categories.length && draftOfferDetails.facets.length && leafNode) {
          let values = draftOfferDetails.facets.map(item => {
            return item.values.map(value => ({ label: value , name: item.label, tagId: '' }))
          });
          values = values.reduce((a,b) => a.concat(b), []);
          console.log('values', values.reduce((a,b) => a.concat(b), []));
          this.categories = [...this.categories, ...values];
          console.log('hehhehehehhe', this.categories);
          tags = tags.filter( function( item ) {
            for( var i=0, len=values.length; i<len; i++ ){
                if( values[i].name == item.label ) {
                    item.values = item.values.filter(e => e !== values[i].label)
                }
            }
            return true;
          });
        console.log('Tags::::::', tags);
        this.allCategoriesDraftTags = tags;
        }
        // this.categories = [...this.categories, {label, categoryId, leafNode}];
        this.offerService.setFinalTags(this.categories);
        if(this.categories.length === 1) {
          this.allCategories$ = this.httpService.findRootCategories(categoryId); 
        } else {
          if(!leafNode) {
            this.allCategories$ = this.httpService.findCategoryTree(categoryId); 
          } else {
            this.itemTagPresent = true;
            this.allTags$ = of(tags);
          }
        }        
      } else {
        this.allCategories$ = this.sharedService.rootCategory$;
        this.sharedService.rootCategory.subscribe((res: any) => {
          this.rootCategoryResponse = res;
          this.allCategories$ = of(this.rootCategoryResponse);
        })
      }
    })
    
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      // this.categories.push({name: value.trim()});
      this.categories.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      // this.categories.push({name: value.trim()});
      this.customTags = [...this.customTags, value.trim()];
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.addTagCtrl.setValue(null);
  }

  removeTag(tag: string): void {
    const index = this.customTags.indexOf(tag);
    if (index >= 0) {
      this.customTags.splice(index, 1);
    }
  }

  remove(category: any, index: number): void {
    // const index = this.categories.indexOf(category);
    const initialTagArr = [...this.categories];
    let lastElementInitialTagArr = initialTagArr[initialTagArr.length - 1];
    const removeElement = category;    
    if (index >= 0 && this.categories.length === 1) {
      this.categories.splice(index, 1);
    }
    
    if(index >=0 && this.categories.length > 1) {
      const isLeaf = removeElement.categoryId ? removeElement.leafNode : null;
      if(!isLeaf) {
        this.categories.splice(index, 1);
      } else {
        // lastElementInitialTagArr = initialTagArr[initialTagArr.length - index];
        this.categories.length = index;
        lastElementInitialTagArr.categoryId = removeElement.categoryId;
      }
    }
    if(!this.categories.length) {
        this.itemTagPresent = false;
        this.allCategories$ = this.httpService.findAllCategories(this.chipType);      
    }

    if(this.categories.length) {
      const catId: string = removeElement.categoryId;
      const tagId: string = removeElement.tagId;
      const tagName: string = removeElement.name;
      if(tagId) {
        this.allCategoriesTags.forEach(tag => {
          if(tag.tagId === tagId) {
            tag.values = [removeElement.value, ...tag.values];
          } 
        })      
        this.allTags$ = of(this.allCategoriesTags);
      }
      
      // logic execute for draft offer with selected tags
      if(tagId === '' && tagName) {
        this.allCategoriesDraftTags.forEach(tag => {
          if(tag.label === tagName) {
            tag.values = [removeElement.label, ...tag.values];
          } 
        })      
        this.allTags$ = of(this.allCategoriesDraftTags);
      }

      if(!tagId && catId && lastElementInitialTagArr.categoryId === catId) {
        this.itemTagPresent = false;
        const presentTagArray = [...this.categories];
        const lastElementPresentTagArr = presentTagArray[presentTagArray.length - 1];
        let {label, categoryId, leafNode} = lastElementPresentTagArr
        this.allCategories$ = this.fetchCategoryTree(leafNode, categoryId);
      } else {
        // this.tagValues= [{values:[category.label]}, ...this.tagValues];
      }
      
    }
    this.offerService.setFinalTags(this.categories);  
  }

  removeSelectedCategories(item: any, index: number): void {
    const itemArr = this.sharedService.rootCategory.getValue();
    if(!this.categories.length) {
      this.allCategories$ = this.httpService.findRootCategories(item.verticalId); 
    }

    if(!item.hasOwnProperty("leafNode")) {
      const {label, verticalId, url} = item;
      this.categories = [...this.categories, {label, categoryId: verticalId, url}];
    } else {
      const {label, categoryId, leafNode} = item;
      this.categories = [...this.categories, {label, categoryId, leafNode}];
    }   
    
    if(this.tagInput) {
      this.tagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
    }    

    if(!item.hasOwnProperty("leafNode") && this.categories.length > 1) {
      this.allCategories$ = this.httpService.findCategoryTree(item.verticalId); 
    } else if(item.hasOwnProperty("leafNode") && !item.leafNode && this.categories.length > 1) {
      this.allCategories$ = this.httpService.findCategoryTree(item.categoryId); 
    } else if(item.hasOwnProperty("leafNode") && item.leafNode && this.categories.length > 1) {
      this.itemTagPresent = true;
      this.allTags$ = this.httpService.getAllTagsByCategoryId(item.categoryId);
    }
    this.offerService.setFinalTags(this.categories);
    }

  removeSelectedTags(value: string, valueIndex: number, tagArrayIndex: number, tagArray: any): void {
    const item = tagArray[tagArrayIndex];
    const { label: facetLabel, values, tagId } = item;
    const selectedValue = values[valueIndex];     
    this.categories = [...this.categories, { facetLabel, label: selectedValue, value: selectedValue, tagId }];
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    const updatedItem = {}
    item.values = item.values.filter(value => value !== selectedValue);
    tagArray[tagArrayIndex] = item;
    this.allCategoriesTags = tagArray;
    this.allTags$ = of(this.allCategoriesTags);
    this.offerService.setFinalTags(this.categories);
  }

  fetchCategoryTree(leafNode: any, categoryId: any, tagId?: any) { 
    if(leafNode) {      
      return this.httpService.getAllTagsByCategoryId(categoryId)
    } else if(this.categories.length === 1) {
      return this.httpService.findRootCategories(categoryId)
    } else {
      return this.httpService.findCategoryTree(categoryId)     
    }    
  }

  changeSelected(event: MatChipSelectionChange, item: string): void {
    // console.log('change selected::::::', event.selected);
  }

  changeSelectedTag(event: MatChipSelectionChange, item: string): void {
    console.log('change selected Tag::::::', event.selected);
  }

  addTags() {
    this.addTagInput.nativeElement.value = '';
    this.addTagCtrl.setValue(null);
    if(!this.customTags.length) {
      return false;
    }
    this.selectedCustomTag.emit(this.customTags);
    this.customTags = [];
  }

}
