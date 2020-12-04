// import { Injectable, Inject } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

// // tslint:disable-next-line: ban-types
// declare var gtag: Function;

// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleAnalyticsService {

//   private gtmId: string;
//   constructor(
//     @Inject('googleTagManagerId') public googleTagManagerId: string,
//     private router: Router) {
//     this.gtmId = googleTagManagerId;
//   }

//   public event(eventName: string, params: {}) {
//     gtag('event', eventName, params);
//   }

//   public init() {
//     this.listenForRouteChanges();
//     try {
//       // Create gtag script
//       const script1 = document.createElement('script');
//       script1.async = true;
//       script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.gtmId;
//       document.head.appendChild(script1);

//       // Call gtag global functions
//       const script2 = document.createElement('script');
//       script2.innerHTML = `
//         window.dataLayer = window.dataLayer || [];
//         function gtag(){dataLayer.push(arguments);}
//         gtag('js', new Date());
//         gtag('config', '` + this.gtmId + `', {'send_page_view': false});
//       `;
//       document.head.appendChild(script2);
//     } catch (ex) {
//       console.error('Error appending google gtag scripts', ex);
//     }
//   }

//   private listenForRouteChanges() {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         gtag('config', this.gtmId, {
//           page_path: event.urlAfterRedirects,
//         });
//         console.log('Sending Google Analytics hit for route', event.urlAfterRedirects);
//       }
//     });
//   }
// }
