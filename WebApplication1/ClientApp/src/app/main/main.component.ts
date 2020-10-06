import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AuthService} from '@auth0/auth0-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private token: any;
  weather: any;

  constructor(@Inject(DOCUMENT) private doc: Document, public auth: AuthService, private http: HttpClient) {

  }

  logout(): void {
    // Call this to redirect the user to the login page
    this.auth.logout({returnTo: window.location.origin});
  }

  makeApiCall() {
    this.auth.getAccessTokenSilently().subscribe(t => {
      this.token = t;
      this.http.get('/api/WeatherForecast', {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
      }).subscribe(result => this.weather = result);
    })

  }
}
