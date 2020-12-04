import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService, FooterService } from '@gintaa/shared';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss']
})
export class EmailVerifiedComponent implements OnInit, OnDestroy {

  constructor(private headerService: HeaderService,
              private footerService: FooterService,
              private fireAuth: AngularFireAuth,
              private authService: AuthService) { 
                this.fireAuth.authState.subscribe(async (user) => {
                  if (user) {
                      //this.user = user;
                      console.log('authState from email comp changed..', await user.getIdToken());
                      this.authService.setFirebaseUser(user);
                  } else {
                      console.log('In authstate email comp...');
                      // this.authService.clearFirebaseUser();
                  }
              });
              }

  ngOnInit() {
    this.headerService.hideHeader();
    this.footerService.hideFooter();
  }

  ngOnDestroy(): void {
    this.headerService.showHeader();
    this.footerService.showFooter();
  }

}
