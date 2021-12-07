import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PassengerComponent } from './passenger.component';


const routes: Routes = [
  {
    path: '',
    component: PassengerComponent,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        loadChildren: () => import('@flight-workspace/passenger/feature-search')
          .then(esm => esm.PassengerFeatureSearchModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('@flight-workspace/passenger/feature-edit')
          .then(esm => esm.PassengerFeatureEditModule)
      }
    ]
  }
];


@NgModule({
  declarations: [PassengerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PassengerModule { }


// Access the exposed module dynamically

// ...through a const
export const moduleRef = PassengerModule;

// ...through a TS dictionary by using a string key
const myDynModules: Record<string, Type<unknown>> = {
  passenger: PassengerModule
};

myDynModules['passenger'];
