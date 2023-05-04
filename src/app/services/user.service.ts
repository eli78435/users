import { Injectable, Query } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { child } from '@angular/fire/database';
import { Database, getDatabase, ref, set, get, update } from "firebase/database";
import { Observable, Subject, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserDetails } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private db: Database = getDatabase();
  private _authUserDetails$: Observable<UserDetails | null>;

  get currentUser(): Observable<User | null> {
    return authState(this.auth);
  }

  get currentUserDetails(): Observable<UserDetails | null> {
    return this._authUserDetails$;
  }

  get displayName(): Observable<string | null> {
    return this._authUserDetails$.pipe(
      map(userDetails => userDetails?.name ?? null)
    );
  }

  get userImageUrl(): Observable<string | null> {
    return this._authUserDetails$.pipe(
      map(userDetails => userDetails?.photoURL ?? null)
    );
  }

  get isAdmin(): Observable<boolean> {
    return this._authUserDetails$.pipe(
      map(userDetails => userDetails?.isAdmin ?? false)
    );
  }

  constructor(private auth: Auth) {
    this._authUserDetails$ = authState(this.auth).pipe(
      switchMap((user, i) => {
        if(user) {
          return from(
            this.getUser(user.uid)
          )
        } else {
          return of(null);
        }
      })
    )
  }

  getUser(userId: string): Promise<UserDetails | null> {
    return get(ref(this.db, '/users/' + userId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return null;
        }
      });
  }

  addUser(user: UserDetails): Promise<void> {
    const notAdminUser: UserDetails = {
      ...user,
      isAdmin: false
    };
    return set(ref(this.db, '/users/' + user?.uid), user);
  }

  updateUser(user: UserDetails): Promise<void> {
    const userToUpdate = {
      uid: user?.uid,
      name: user?.name,
      email: user?.email,
      photoURL: user?.photoURL,
    };
    return update(ref(this.db, '/users/' + user?.uid), userToUpdate);
  }
}
