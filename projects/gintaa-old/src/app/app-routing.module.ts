import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import("./user/user.module").then(m => m.UserModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
    import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: 'user-home',
    loadChildren: () =>
    import("./user-home/user-home.module").then(m => m.UserHomeModule)
  },
  { path: 'category',
    loadChildren: () =>
    import("./category/category.module").then(m => m.CategoryModule)
  },
  {
    path: 'add-new-offer',
    loadChildren: () => 
    import("./offers/offers.module").then(m => m.OffersModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
    import("./profile/profile.module").then(m => m.ProfileModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
  // { path: 'offer-details/:type/:id', component: OfferDetailsComponent, resolve: { offerDetail: OfferDetailsResolverService }, canDeactivate: [CanDeactivateGuard]},
  // { path: 'about', component: AboutComponent },  
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, {
    //   preloadingStrategy: PreloadAllModules
    // })
     RouterModule.forRoot(routes, {
       preloadingStrategy: PreloadAllModules,
       scrollPositionRestoration: 'enabled',
       anchorScrolling: 'enabled',
       scrollOffset: [0, 64]
     })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

