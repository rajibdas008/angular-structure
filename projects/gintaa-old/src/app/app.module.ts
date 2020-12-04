import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faLinkedinIn, faPinterestP, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ToastrModule } from 'ngx-toastr';
// import { GtagModule } from './common/module/gtag/gtag.module';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { DealsModule } from './deals/deals.module';
import { SharedModule } from './shared/shared.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const APP_ID = 'gintaa-angular-universal-firebase';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
   // GtagModule.forRoot({ trackingId: environment.gtagTrakingId, trackPageviews: true, debug: true }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FontAwesomeModule,
    BrowserModule.withServerTransition({ appId: APP_ID }),
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DealsModule,
    SharedModule,
    CoreModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    const icons = [faFacebookF, faTwitter, faLinkedinIn, faPinterestP, faWhatsapp];
    library.addIcons(...icons);
  }
}
