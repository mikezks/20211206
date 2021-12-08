import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Passenger } from './passenger.model';
import * as PassengerActions from './passenger.actions';

export const passengersFeatureKey = 'passengers';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State extends EntityState<Passenger> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Passenger> = createEntityAdapter<Passenger>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(PassengerActions.addPassenger,
    (state, action) => adapter.addOne(action.passenger, state)
  ),
  on(PassengerActions.upsertPassenger,
    (state, action) => adapter.upsertOne(action.passenger, state)
  ),
  on(PassengerActions.addPassengers,
    (state, action) => adapter.addMany(action.passengers, state)
  ),
  on(PassengerActions.upsertPassengers,
    (state, action) => adapter.upsertMany(action.passengers, state)
  ),
  on(PassengerActions.updatePassenger,
    (state, action) => adapter.updateOne(action.passenger, state)
  ),
  on(PassengerActions.updatePassengers,
    (state, action) => adapter.updateMany(action.passengers, state)
  ),
  on(PassengerActions.deletePassenger,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PassengerActions.deletePassengers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PassengerActions.loadPassengers,
    (state, action) => adapter.setAll(action.passengers, state)
  ),
  on(PassengerActions.clearPassengers,
    state => adapter.removeAll(state)
  ),
);



// Runtime EntityState object
const passengers = {
  entities: {
    1: { id: 1, lastname: 'Smith', firstname: 'Anne' },
    2: { id: 2, lastname: 'Smith', firstname: 'Anne' },
    3: { id: 3, lastname: 'Smith', firstname: 'Anne' },
    4: { id: 4, lastname: 'Smith', firstname: 'Anne' }
  },
  ids: [4, 1, 2, 3]
};

// Performat access by ID w/o array iteration
const p3 = passengers.entities[3];
