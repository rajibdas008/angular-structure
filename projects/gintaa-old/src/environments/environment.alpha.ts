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
  googleApiKey: 'AIzaSyCnmIgJkn44mL-UAlIOEq-kcOTLEUk3Ups',
  enableDebug: true,
  imageLimit: 10,
  vedioLimit: 2,
  serverUrl: 'https://alpha.api.gintaa.com/',
  WEBSITE_URL: 'https://alpha.gintaa.com',
  firebaseConfig: {
    apiKey: "AIzaSyDF8q5f7ErhnFfy9261MdnJi2mAJw_pgjk",
    authDomain: "gintaa-cloud-alpha.firebaseapp.com",
    databaseURL: "https://gintaa-cloud-alpha.firebaseio.com",
    projectId: "gintaa-cloud-alpha",
    storageBucket: "gintaa-cloud-alpha.appspot.com",
    messagingSenderId: "574114177967",
    appId: "1:574114177967:web:e671f92319b1b055d7455a",
    measurementId: "G-6D3XWVX73P"
  },
  appVerificationDisabledForTesting: false,
  // chatSocketUrl: 'http://15.207.181.152:9600/deals',
  chatSocketUrl: 'https://alpha.api.gintaa.com/deals',

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
