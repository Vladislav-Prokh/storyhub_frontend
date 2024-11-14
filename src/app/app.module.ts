import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { TextPageComponent } from './text-page/text-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {AuthInterceptorService} from './services/auth_interceptor/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnglishTextCardComponent } from './english-text-card/english-text-card.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import {RootComponent} from './root/root.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MainLayoutComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    TextPageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    EnglishTextCardComponent,
    AuthLayoutComponent,
    RootComponent,
    AdminPanelComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
