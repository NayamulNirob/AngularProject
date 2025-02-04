import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthResponse, UserModel } from '../model/sale.model';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:3000/user";

  private currentUserSubject: BehaviorSubject<UserModel | null>;
  public currentUser$: Observable<UserModel | null>;

  constructor(

    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object  
  ) {
    const storedUser = this.isBrowser() ? JSON.parse(localStorage.getItem('currentUser') || 'null') : null;
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  regitration(user: UserModel): Observable<AuthResponse> {

    return this.http.post<UserModel>(this.baseUrl, user).pipe(
      map((newUser: UserModel) => {
        const token = btoa(`${newUser.email}${newUser.password}`);
        return { token, user: newUser } as AuthResponse;
      }),
      catchError(error => {
        console.error('Regitration error:', error);
        throw error;
      })

    );
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {

    let params = new HttpParams().append('email', credentials.email);

    return this.http.get<UserModel[]>(`${this.baseUrl}`, { params }).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          if (user.password === credentials.password) {
            const token = btoa(`${user.email}:${user.password}`);
            this.storeToken(token);
            this.setCurrentUser(user);
            this.currentUserSubject.next(user); 
            return { token, user } as AuthResponse;
          } else {
            this.currentUserSubject.next(null); 
            alert('Invalid Password');
            throw new Error('Invalid Password'); 
          }
        } else {
          this.currentUserSubject.next(null)
          alert('User not found');
          throw new Error('User not found')
        }
      }),
      catchError(error => {
        this.currentUserSubject.next(null)
        console.error('Login error', error);
        throw error;
      })
    );

  }

  public get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }


  logout(): void {
    this.clearCurrentuser();
    if(this.isBrowser()){
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
  }

  private setCurrentUser(user: UserModel): void {

    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);

  }

  private clearCurrentuser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  isAuthenticated():boolean{
    return !!this.getToken();
  }

 

  getToken(): string | null {
    return this.isBrowser()? localStorage.getItem('token'):null;
  }

  getUserRole():any{
    return this.currentUserValue?.role;
  }

  storeToken(token: string): void {
    if(this.isBrowser()){
      localStorage.setItem('token', token);
    }
  }

  storeUserProfile(user: UserModel): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getUserProfileFromStore(): UserModel | null {
    if(this.isBrowser()){
      const userProfile = localStorage.getItem('currentUser');
    return userProfile ? JSON.parse(userProfile) : null;
    }
    return null;
  }

  removeUserDetails():void {
    if(this.isBrowser()){
      localStorage.clear();
    }
  }
}
