import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { FlightService } from '@flight-workspace/flight-lib';
import * as FlightBookingActions from './flight-booking.actions';


@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() =>
    // Stream 1: Dispatched actions to filter on
    // Trigger
    // Data Provider
    this.actions$.pipe(
      // Filtering
      ofType(FlightBookingActions.flightsLoad),
      // Stream 2: API call through FlightService; switching to second stream
      // Data Provider
      switchMap(action => this.flightService.find(
          action.from,
          action.to,
          action.urgent
        ).pipe(
          // Transformation: transform Flights to Action with payload; automatically dispatched
          map(flights => FlightBookingActions.flightsLoadedSuccess({ flights })),
          // Error Handling
          catchError(err => of(FlightBookingActions.flightsLoadedFailure({ error: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}
}
