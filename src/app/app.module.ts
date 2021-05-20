import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { VaccinationListItemComponent } from './vaccination-list-item/vaccination-list-item.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { ImpfserviceService } from './shared/impfservice.service';
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';
import { LocationService } from './shared/location.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { JwtInterceptorService } from './shared/jwt-interceptor.service';

registerLocaleData(localeDe);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    VaccinationListComponent,
    VaccinationListItemComponent,
    VaccinationDetailsComponent,
    VaccinationFormComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    ImpfserviceService,
    LocationService,
    DatePipe,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'de' }
  ]
})
export class AppModule {}
