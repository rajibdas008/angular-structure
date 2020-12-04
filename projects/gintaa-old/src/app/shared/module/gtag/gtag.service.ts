// import { Injectable, Inject } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { tap, filter } from 'rxjs/operators';
// import { GtagConfig, GtagEvent, GtagPageview } from './gtag.interfaces';
// declare var gtag: any;

// /**
//  * gtag('event', <action>, {
//  * 'event_category': <category>,
//  * 'event_label': <label>,
//  * 'value': <value>
//  * });
//  *
//  * <action> is the string that will appear as the event action in Google Analytics Event reports.
//  * <category> is the string that will appear as the event category.
//  * <label> is the string that will appear as the event label.
//  * <value> is a non-negative integer that will appear as the event value.
//  *
//  * Example:::
//  * Category: "Videos"
//  * Action: "Play"
//  * Label: "Baby's First Birthday"
//  *
//  * See https://support.google.com/analytics/answer/1033068 for event details
//  */
// @Injectable()
// export class Gtag {
//     private mergedConfig: GtagConfig;
//     constructor(@Inject('config') gaConfig: GtagConfig, private router: Router) {
//         this.mergedConfig = { trackPageviews: true, ...gaConfig };
//         this.appendScripts();
//         if (this.mergedConfig.trackPageviews) {
//             router.events
//                 .pipe(
//                     filter(event => event instanceof NavigationEnd),
//                     tap(event => {
//                         this.pageview();
//                     })
//                 )
//                 .subscribe();
//         }
//     }
//     private appendScripts() {
//         try {
//             // Create gtag script
//             const script1 = document.createElement('script');
//             script1.async = true;
//             script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.mergedConfig.trackingId;
//             document.head.appendChild(script1);
//             // Call gtag global functions
//             const script2 = document.createElement('script');
//             script2.innerHTML = `
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', '` + this.mergedConfig.trackingId + `', {'send_page_view': false});
//           `;
//             document.head.appendChild(script2);
//         } catch (ex) {
//             console.error('Error appending google gtag scripts', ex);
//         }
//     }
//     event(action: string, params: GtagEvent = {}) {
//         // try/catch to avoid cross-platform issues
//         try {
//             gtag('event', action, params);
//             this.debug('event', this.mergedConfig.trackingId, action, params);
//         } catch (err) {
//             console.error('Google Analytics event error', err);
//         }
//     }

//     pageview(params?: GtagPageview) {
//         try {
//             const defaults = {
//                 page_path: this.router.url,
//                 // page_title: 'Angular App',
//                 page_location: window.location.href
//             };

//             params = { ...defaults, ...params };
//             gtag('config', this.mergedConfig.trackingId, params);
//             this.debug('pageview', this.mergedConfig.trackingId, params);
//         } catch (err) {
//             console.error('Google Analytics pageview error', err);
//         }
//     }

//     config(params: any) {
//         try {
//             gtag('config', this.mergedConfig.trackingId, (params = {}));
//         } catch (err) {
//             console.error('Google Analytics config error', err);
//         }
//     }

//     set(params: any) {
//         try {
//             gtag('set', (params = {}));
//         } catch (err) {
//             console.error('Google Analytics set error', err);
//         }
//     }

//     private debug(...msg) {
//         if (this.mergedConfig.debug) {
//             console.log('angular-gtag:', ...msg);
//         }
//     }
// }


// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { GtagPageview, GtagEvent, GtagConfig } from './gtag.interfaces';
// import { Router, NavigationEnd } from '@angular/router';
// import { tap, filter } from 'rxjs/operators';
// import { isPlatformBrowser } from '@angular/common';
// import { Location } from '@angular/common';
// declare var gtag: any;

// @Injectable()
// export class Gtag {
//   private mergedConfig: GtagConfig;
//   testBrowser: any;
//   constructor(@Inject('config') gaConfig: GtagConfig, private router: Router, @Inject(PLATFORM_ID) platformId: string,private location:Location) {
//     this.testBrowser = isPlatformBrowser(platformId);
//     this.mergedConfig = { trackPageviews: true, ...gaConfig };
//     if (this.mergedConfig.trackPageviews && this.testBrowser) {
//       router.events
//         .pipe(
//           filter(event => event instanceof NavigationEnd),
//           tap(event => {
//             this.pageview();
//           })
//         )
//         .subscribe();
//     }
//   }

//   event(action: string, params: GtagEvent = {}) {
//     // try/catch to avoid cross-platform issues
//     try {
//       gtag('event', action, params);
//       this.debug('event', this.mergedConfig.trackingId, action, params);
//     } catch (err) {
//       console.error('Google Analytics event error', err);
//     }
//   }

//   pageview(params?: GtagPageview) {
//     try {
//       const defaults = {
//         page_path: this.router.url,
//         page_title: 'Angular App',
//         page_location: this.location.path()
//       };

//       params = { ...defaults, ...params };
//       gtag('config', this.mergedConfig.trackingId, params);
//       this.debug('pageview', this.mergedConfig.trackingId, params);
//     } catch (err) {
//       console.error('Google Analytics pageview error', err);
//     }
//   }

//   config(params: any) {
//     try {
//       gtag('config', this.mergedConfig.trackingId, (params = {}));
//     } catch (err) {
//       console.error('Google Analytics config error', err);
//     }
//   }

//   set(params: any) {
//     try {
//       gtag('set', (params = {}));
//     } catch (err) {
//       console.error('Google Analytics set error', err);
//     }
//   }

//   private debug(...msg) {
//     if (this.mergedConfig.debug) {
//       console.log('angular-gtag:', ...msg);
//     }
//   }
// }