// import { NgModule, ModuleWithProviders } from '@angular/core';
// import { Gtag } from './gtag.service';
// import { GtagEventDirective } from './gtag-event.directive';
// import { GtagConfig } from './gtag.interfaces';

// /**
//  * The implementation is based on Google developer documentation for details
//  * https://developers.google.com/analytics/devguides/collection/gtagjs/events
//  */
// @NgModule({
//     declarations: [GtagEventDirective],
//     exports: [GtagEventDirective]
// })
// export class GtagModule {
//     public static forRoot(config: GtagConfig): ModuleWithProviders {
//         return {
//             ngModule: GtagModule,
//             providers: [Gtag, { provide: 'config', useValue: config }]
//         };
//     }
// }