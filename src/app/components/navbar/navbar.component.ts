import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAdmin$: Observable<boolean>;
  displayName$: Observable<string | null>;

  constructor(private authService: AuthService, 
    private userService: UserService,
    private router: Router) {
    this.displayName$ = this.userService.displayName;
    this.isAdmin$ = this.userService.isAdmin;
  }

  ngOnInit(): void {
    
  }
  
  logOut() {
    this.authService.logOut()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
