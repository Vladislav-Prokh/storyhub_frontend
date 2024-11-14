import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080'; 

  private token: string | null = null;

  private currentUserRolesSubject = new BehaviorSubject<string[]>([]);
  public currentUserRoles$ = this.currentUserRolesSubject.asObservable();

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { username, password };
    
    return this.http.post<any>(url, body).pipe(
      map(response => {
        this.handleResponse(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleResponse(error);
      })
    );
  }
  register(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;
    const body = { username, password };
  
    return this.http.post<any>(url, body).pipe(
      map(response => {
        this.handleResponse(response);
        return response; 
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleResponse(error); 
        return throwError(() => new Error(error.message || 'Registration failed')); 
      })
    );
  }
  logout() {
    this.clearToken();
    this.clearRoles();
  }

  handleResponse(response:any){
    if(response && response.jwtToken){
        this.setToken(response.jwtToken);
        this.setCurrentUserRoles(response.userRoles);
        return response;
    }
    else if(response &&  response.status ==="CREATED"){
      return response;
    }
    else{
        this.clearToken();
        return throwError(() => new Error("An unknown error occured")); 
    }
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }
  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }
  private clearToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token'); 
  }
  public getCurrentUserRoles(): Observable<string[]> {
    if (!this.currentUserRolesSubject.value.length) {
      const storedRoles = localStorage.getItem('user_roles');
      if (storedRoles) {
        this.currentUserRolesSubject.next(JSON.parse(storedRoles));
      }
    }
    return this.currentUserRoles$;
  }
  
  private setCurrentUserRoles(roles: string[]) {
    this.currentUserRolesSubject.next(roles);
    localStorage.setItem('user_roles', JSON.stringify(roles));
  }

  private clearRoles() {
    localStorage.removeItem("user_roles");
  }
}
