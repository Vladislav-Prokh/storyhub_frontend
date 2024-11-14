import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './services/auth_service'; 
@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    private adminRole: string = "ADMIN";
  
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.getCurrentUserRoles().pipe(
        map(roles => {
          if (roles.includes(this.adminRole)) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
    }
  }