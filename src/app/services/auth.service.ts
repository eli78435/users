import { Injectable } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider, 
  signInWithPopup,
  signInAnonymously,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(this.auth, provider);
    console.log(userCredentials);
  }

  async loginWithFacebook(): Promise<void> {
    const provider = new FacebookAuthProvider();
    const userCredentials = await signInWithPopup(this.auth, provider);
    console.log(userCredentials);
  }

  async loginWithEmail(): Promise<void> {
    const provider = new EmailAuthProvider();
    const userCredentials = await signInWithPopup(this.auth, provider);
    console.log(userCredentials);
  }

  async logOut() {
    await signOut(this.auth);
  }


}
