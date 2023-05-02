import { Injectable } from '@angular/core';
import { 
  Auth, 
  authState,
  Unsubscribe,
  User
} from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser: Subject<User | null> = new Subject<User | null>();

  get currentUser(): Observable<User | null> {
    return authState(this.auth);
  }

  get displayName(): Observable<string | null> {
    return authState(this.auth).pipe(
      map(user => user?.displayName ?? null)
    );
  }

  constructor(private auth: Auth) {}
}
