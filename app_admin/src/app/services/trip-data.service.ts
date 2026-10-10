
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/api/trips';

  // Retrieve the saved JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('travlr-token');

    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }

  // Get all trips (public)
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  // Add a trip (protected)
  addTrip(formData: Trip): Observable<Trip[]> {
    return this.http.post<Trip[]>(
      this.url,
      formData,
      { headers: this.getAuthHeaders() }
    );
  }

  // Delete a trip (protected)
  deleteTrip(tripCode: string): Observable<Trip> {
    return this.http.delete<Trip>(
      `${this.url}/${tripCode}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // Get one trip (public)
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.url}/${tripCode}`
    );
  }

  // Update a trip (protected)
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.url}/${formData.code}`,
      formData,
      { headers: this.getAuthHeaders() }
    );
  }

  // Authenticate an existing user
  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'http://localhost:3000/api/login',
      user
    );
  }

  // Register a new user
  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'http://localhost:3000/api/register',
      user
    );
  }
}
