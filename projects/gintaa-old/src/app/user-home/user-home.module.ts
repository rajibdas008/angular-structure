import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnlyCustomerAccess } from '@gintaa/shared/guards';
import { SharedModule } from '@gintaa/shared/shared.module';
import { MatchItemComponent } from './match-item/match-item.component';
import { UserSliderComponent } from './match-item/user-slider/user-slider.component';
import { PopularCategoryComponent } from './popular-category/popular-category.component';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';
import { TradingProductsComponent } from './trading-products/trading-products.component';
import { UserHomeComponent } from './user-home.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { YouLikeComponent } from './you-like/you-like.component';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserStatusComponent,
    MatchItemComponent,
    YouLikeComponent,
    UserSliderComponent,
    TradingProductsComponent,
    PopularCategoryComponent,
    RecentlyViewedComponent
  ],
  imports: [
    RouterModule.forChild([
        {
            path: '',
            component: UserHomeComponent,
            canActivate: [OnlyCustomerAccess]
        }
    ]),
    SharedModule
  ],
})
export class UserHomeModule {}