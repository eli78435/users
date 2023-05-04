import { Injectable } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  EmailAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  AuthProvider
} from '@angular/fire/auth';
import { UserDetails } from '../models/user-details.model';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private userService: UserService, private router: Router) { }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return this.login(provider);
  }

  async loginWithFacebook(): Promise<void> {
    const provider = new FacebookAuthProvider();
    return this.login(provider);
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(async credential => {
        if(credential) {
          const userDetails: UserDetails = {
            uid: credential.user?.uid ?? '',
            name: credential.user?.displayName ?? credential.user?.email?.split('@')?.[0] ?? '',
            email: credential.user?.email ?? '',
            isAdmin: false,
            photoURL: ''
          };
          await this.userService.updateUser(userDetails);

          const returnUrl = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(returnUrl ?? '/');
        } else {
          console.log(`credential is null`);
          this.router.navigateByUrl('/login');
        }}, error => {
          console.log(error);
          this.router.navigateByUrl('/login');
        }
      );
  }

  private async login(provider: AuthProvider): Promise<void> {
    await signInWithPopup(this.auth, provider)
      .then(async credential => {
        if(credential) {
          const userDetails: UserDetails = {
            uid: credential.user?.uid ?? '',
            name: credential.user?.displayName ?? '',
            email: credential.user?.email ?? '',
            isAdmin: false,
            photoURL: credential.user?.photoURL ?? ''
          };
          await this.userService.updateUser(userDetails);

          const returnUrl = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(returnUrl ?? '/');
        } else {
          console.log(`credential is null`);
          this.router.navigateByUrl('/login');
        }
      }, error => {
        console.log(error);
        this.router.navigateByUrl('/login');
      });
  }

  async logOut() {
    await signOut(this.auth);
  }
}
