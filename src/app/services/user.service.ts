import { Injectable, Query } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { child } from '@angular/fire/database';
import { Database, getDatabase, ref, set, get, update } from "firebase/database";
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetails } from '../models/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private db: Database = getDatabase();
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

  getUser(userId: string): Promise<UserDetails | null> {
    return get(ref(this.db, '/users/' + userId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
          return null;
        }
      });
  }

  addUser(user: UserDetails): Promise<void> {
    return set(ref(this.db, '/users/' + user?.uid), user);
  }

  updateUser(user: UserDetails): Promise<void> {
    return update(ref(this.db, '/users/' + user?.uid), user);
  }
}
