import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MainComponent } from './main/main.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: '',
      clientId: '',
      audience: '',
      httpInterceptor: {
        allowedList: [
          // Attach access tokens to any calls to '/api' (exact match)
          '/api',

          // Attach access tokens to any calls that start with '/api/'
          '/api/*',
        ]
      }
    }),
    RouterModule.forRoot(
      [
        {
          path: 'main',
          component: MainComponent
        },
        {
          path: '',
          component: LoginComponent
        }]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
