import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { debounceTime, delay, distinctUntilChanged, EMPTY, filter, map, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit {
  control = new FormControl();
  flights$: Observable<Flight[]> = EMPTY;
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const stateProvider = of('Wien');

    // Stream 3: Flight search result
    // Data Provider
    this.flights$ =
      // Stream 1: value changes of the input control
      // Trigger
      // Not our Data Provider!
      this.control.valueChanges.pipe(
        withLatestFrom(stateProvider),
        map(([inputCity, stateProviderCity]) => inputCity),
        // Filtering STARTS
        filter(city => city.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        // Filtering ENDS
        // Side-effect
        tap(() => this.loading = true),
        // Stream 2: get Flight array
        // Connecting another Data Provider
        // Switched from Stream 1 to Stream 2
        switchMap(city => this.load(city)),
        // delay(2000),
        // Side-effect
        tap(() => this.loading = false)
      );
  }

  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }
}
