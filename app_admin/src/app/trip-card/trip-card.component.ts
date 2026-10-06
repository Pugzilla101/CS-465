import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
  }

  public editTrip(trip: any): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: any): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripDataService.deleteTrip(trip.code)
        .subscribe({
          next: () => {
            window.location.reload();
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

}