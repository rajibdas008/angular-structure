import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    user: firebase.User;
    signInConfirmationResultSub: BehaviorSubject<any> = new BehaviorSubject(null);
    public firebaseAuthError = new Subject<string>();
    firebaseAuthError$ = this.firebaseAuthError.asObservable();

    constructor(
        public fireAuth: AngularFireAuth,
        private authService: AuthService) {
        firebase.auth().settings.appVerificationDisabledForTesting = environment.appVerificationDisabledForTesting;
        this.fireAuth.authState.subscribe(async (user) => {
            if (user) {
                const authUserData = JSON.parse(JSON.stringify(user));
                this.user = user;
                this.authService.setFirebaseUser(
                    user, 
                    authUserData.stsTokenManager.accessToken,
                    authUserData.stsTokenManager.expirationTime
                );
            } else {
                console.log('In authstate else...');
                // this.authService.clearFirebaseUser();
            }
        });
    }

    async signInWithPhoneNumber(phoneNumber: string): Promise<firebase.auth.ConfirmationResult> {
        const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: "invisible"
        });
        const confirmationRes = await this.fireAuth.auth.signInWithPhoneNumber(phoneNumber, applicationVerifier);
        this.signInConfirmationResultSub.next({
            phoneNumber, confirmationRes
        });
        return confirmationRes;
    }

    async signInWithEmailAndPassword(email: string, password: string): Promise<auth.UserCredential> {
        const result = await this.fireAuth.auth.signInWithEmailAndPassword(email, password);
        //console.log(JSON.stringify(result));
        return result;
    }

    async signInWithGoogle() {
        const result = await this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        return result;
    }

    async signInWithFacebook() {
        const result = await this.fireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
        return result;
    }


    async linkProfileWithGoogle(){
        const result = await auth().currentUser.linkWithPopup(new auth.GoogleAuthProvider());
        return result;
    }

    async linkProfileWithFacebook(){
        const result = await auth().currentUser.linkWithPopup(new auth.FacebookAuthProvider());
        return result;
    }

    async linkProfileWithPhone(){
        const result = await auth().currentUser.linkWithPopup(new auth.PhoneAuthProvider());
        return result;
    }

    async linkProfileWithEmail(){
        const result = await auth().currentUser.linkWithPopup(new auth.EmailAuthProvider());
        return result;
    }

    async unLinkProfileWithProvider(providerId: string){
        const result = await auth().currentUser.unlink(providerId);
        return result;
    }

    async createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
        const result = await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
        //return this.sendEmailVerification();
        return result;
    }

    async sendEmailVerification() {
        await this.fireAuth.auth.currentUser.sendEmailVerification();
    }

    signOut() {
        return from(this.fireAuth.auth.signOut())
        .pipe(
            //map(() => this.authService.clearAuthInfo()),
            catchError((error, obs) => {
                console.error('logout failed, error:', error);
                return obs;
            })
        );
    }

    getUserProviders(){
        const authInfo = this.authService.getAuthInfo();
        return authInfo ? authInfo.providerData : null;
    }
}
