import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AuthService} from '@auth0/auth0-angular';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private token: any;

  constructor(@Inject(DOCUMENT) private doc: Document, public auth: AuthService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(x => {
      console.log('is authed: ' + x);
    })
  }

  login(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithRedirect().subscribe(() => {
      this.auth.getAccessTokenSilently().subscribe(t => this.token = t);
    });
  }

  logout(): void {
    // Call this to redirect the user to the login page
    this.auth.logout({returnTo: '/'});
  }

  onPop() {
    this.auth.getAccessTokenWithPopup().subscribe(t => console.log(t));
  }
}
