import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../app/main-page/main-page.component';
import { LoginPageComponent } from '../app/login-page/login-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';  
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import {TextPageComponent} from './text-page/text-page.component';
import {AuthLayoutComponent} from './auth-layout/auth-layout.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { 
    path: '', 
    component: MainLayoutComponent, 
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MainPageComponent },
      { path: 'texts/:id', component: TextPageComponent },
      { path: 'admin', canActivate: [AuthGuard],component: AdminPanelComponent }
    ]
  },
  { 
    path: '', 
    component: AuthLayoutComponent, 
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: RegistrationPageComponent }
    ]
  },
  { path: '**', redirectTo: '/home'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
