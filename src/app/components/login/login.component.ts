import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  loginGoogle() {
    this.authService.loginWithGoogle();
  }

  loginFacebook() {
    this.authService.loginWithFacebook();
  }

  loginEmail(event: { email: string; password: string; }) {
    this.authService.loginWithEmail(event.email, event.password);
  }
}
