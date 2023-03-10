import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartistModule } from 'ng-chartist';
import { PetInFormationRoutingModule } from './pet-information.routing';
import {MatGridListModule} from '@angular/material/grid-list';
import { SharedModule } from '../shared/shared.module';
import { PetInformationComponent } from './pet-information.component';
import { MatCardModule } from '@angular/material/card';
import { PetCalendarComponent } from './pet-calendar/pet-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DatePipe }    from '../pipe/date.pipe';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    PetInFormationRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  declarations: [PetInformationComponent, PetCalendarComponent]
})
export class PetInformationModule {}
