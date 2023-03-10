import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTreatmentsComponent } from './my-treatments.component';
import { MyTreatmentsRoutingModule } from './my-treatments.routing';
import 'hammerjs';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [MyTreatmentsComponent],
  imports: [
    CommonModule,
    MyTreatmentsRoutingModule,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DialogModule,
    ButtonModule,
    MatCardModule
  ]
})
export class MyTreatmentsModule { }
