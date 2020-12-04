import { Component, OnInit, Output, EventEmitter, AfterContentInit, AfterViewInit } from '@angular/core';
import { FirebaseAuthService } from '@gintaa/shared/services/auth/firebase.auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-profileshare',
  templateUrl: './profileshare.component.html',
  styleUrls: ['./profileshare.component.scss']
})
export class ProfileshareComponent implements OnInit {

  @Output() childMessage = new EventEmitter();
  constructor(private firebaseAuthService: FirebaseAuthService, private fireAuth: AngularFireAuth) { 
    this.fireAuth.authState.subscribe(async (user) => {
      if (user) {
          this.checkProviders();
          console.log('user setFirebaseUser:::', user);
          // if(!this.authService.getSignInInput()) {
          //   this.authService.setFirebaseUser(user);              
          // } 
          // this.setProfile();
      }
    }); 
  }
  isFacebookConnected = false;
  isGoogleConnected = false;
  errorMessage: string = '';

  ngOnInit() {
    
  }

  checkProviders(){
    const providers = this.firebaseAuthService.getUserProviders();
    for(let item of providers){
      if(item.providerId == 'google.com'){
        this.isGoogleConnected = true;
      } else if(item.providerId == 'facebook.com'){
        this.isFacebookConnected = true;
      }
    }
  }

  async linkProfileWithGoogle(){
    try{
      const res = await this.firebaseAuthService.linkProfileWithGoogle();
      this.errorMessage = '';
      this.childMessage.emit(true);
    }catch(error){
      console.log(error);
      if(error.code && error.code == 'auth/provider-already-linked'){
        this.errorMessage = 'Your profile is already linked with Google.'
      } else if(error.code && error.code == 'auth/email-already-in-use' || error.code && error.code == 'auth/credential-already-in-use') {
        this.errorMessage = 'This email already in use.'
      }
      this.isGoogleConnected = false;
    }
  }

  async linkProfileWithFacebook(){
    try{
      const res = await this.firebaseAuthService.linkProfileWithFacebook();
      this.errorMessage = '';
      this.childMessage.emit(true);
    }catch(error){
      console.log(error);
      if(error.code && error.code == 'auth/provider-already-linked'){
        this.errorMessage = 'Your profile is already linked with Facebook.'
      } else if(error.code && error.code == 'auth/facebook-already-in-use' || error.code && error.code == 'auth/credential-already-in-use') {
        this.errorMessage = 'This Facebook profile is already taken.'
      } else if(error.code && error.code == 'auth/email-already-in-use' || error.code && error.code == 'auth/credential-already-in-use') {
        this.errorMessage = 'This email already in use.'
      }
      this.isFacebookConnected = false;
    }
  }

  async unLinkProfileWithProvider(providerId){
    try{
      const res = await this.firebaseAuthService.unLinkProfileWithProvider(providerId);
      console.log(res);
    }catch(error){
      console.log(error);
    }
  }

  googleToggle(event){
    if(event.checked){
       this.linkProfileWithGoogle();
    } else {
       this.unLinkProfileWithProvider('google.com');
    }
  }

  facebookToggle(event){
    if(event.checked){
       this.linkProfileWithFacebook();
    } else {
      this.unLinkProfileWithProvider('facebook.com');
    }
  }

}
