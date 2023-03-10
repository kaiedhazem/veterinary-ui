import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
    
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'pet-information',
        loadChildren: () => import('./pet-information/pet-information.module').then(m => m.PetInformationModule)
      },
      {
        path: 'my-appointments',
        loadChildren: () => import('./my-appointments/my-appointments.module').then(m => m.MyAppointmentsModule)
      },
      {
        path: 'my-treatments',
        loadChildren: () => import('./my-treatments/my-treatments.module').then(m => m.MyTreatmentsModule)
      }
    ]
  }
];
