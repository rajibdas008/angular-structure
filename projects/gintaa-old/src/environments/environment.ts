// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Previous server URLs
// http://15.207.181.152:8050/gintaa/api/
// https://api.gintaa.com/gintaa/api/
// http://3.7.166.222:8050/gintaa/api/

export const environment = {
  production: false,
  gtagTrakingId: 'UA-166031490-1',
  googleApiKey: 'AIzaSyCN8NceFYZg-ggg4jKbT2QIIg7jQtOg20Y',
  enableDebug: true,
  imageLimit: 10,
  vedioLimit: 2,
  serverUrl: 'https://dev.api.gintaa.com/',
  WEBSITE_URL: 'https://dev.gintaa.com',
  firebaseConfig: {
    apiKey: 'AIzaSyBslwr-3rjlpA41Yv9zt-JnbXXSeSjpnwA',
    authDomain: 'gintaa-firebase.firebaseapp.com',
    databaseURL: 'https://gintaa-firebase.firebaseio.com',
    projectId: 'gintaa-firebase',
    storageBucket: 'gintaa-firebase.appspot.com',
    messagingSenderId: '544816618284',
    appId: '1:544816618284:web:cf734f0579a42a30272a89',
    measurementId: 'G-53WCXKBRQ4'
  },
  appVerificationDisabledForTesting: false,
  // chatSocketUrl: 'http://15.207.181.152:9600/deals',
  chatSocketUrl: 'https://dev.api.gintaa.com/deals',

  // configs related to logger service
  allowConsole: true,
  addConsoleDebugs: true,
  browserLogLevel: '',
  addClientIP: false,
  addClientDeviceInfo: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
