
import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }


  // Retrieve our JWT from local storage
  public getToken(): string {
    let out = this.storage.getItem('travlr-token');

    if (!out) {
      return '';
    }

    return out;
  }

  // Save our JWT to local storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Log out and remove the JWT
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  
  // Check whether the user is logged in
  public isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > (Date.now() / 1000);
      } catch (error) {
        return false;
      }
    }

    return false;
  }

  // Retrieve the current logged-in user
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));

    return { email, name } as User;
  }

  // Log in an existing user
  public login(user: User): Observable<AuthResponse> {
    return this.tripDataService.login(user);
  }
  
  // Register a new user
  public register(user: User): Observable<AuthResponse> {
    return this.tripDataService.register(user);
  }


}
