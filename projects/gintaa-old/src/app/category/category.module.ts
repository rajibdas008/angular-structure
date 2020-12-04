import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { AllCategoryComponent } from './all-category/all-category.component';

@NgModule({
  declarations: [
      CategoryComponent,
      AllCategoryComponent,
      CategoryItemComponent
  ],
  imports: [
    RouterModule.forChild([
        { 
            path: '', 
            component: CategoryComponent
        }
    ]),
    SharedModule
  ],
})
export class CategoryModule {}