import { loadRemoteModule } from '@angular-architects/module-federation';
import { Type } from '@angular/core';
import { ExtraOptions, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'flight-booking',
    loadChildren: () => import('./flight-booking/flight-booking.module')
      .then(esm => esm.FlightBookingModule)
  },
  /* {
    path: 'mf-passenger',
    loadChildren: () => import('passenger/module')
      .then(esm => esm.PassengerModule)
  }, */
  {
    path: 'mf-passenger',
    loadChildren: () => loadRemoteModule<{ moduleRef: Type<unknown> }>({
      remoteName: 'passenger',
      exposedModule: './module'
    })
      .then(esm => esm.moduleRef)
  },
  /* {
    path: 'mf-passenger',
    loadChildren: () => loadRemoteModule<{ moduleRef: Type<unknown> }>({
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'passenger',
      exposedModule: './module'
    })
      .then(esm => esm.moduleRef)
  }, */
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
