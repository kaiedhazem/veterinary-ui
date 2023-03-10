import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyAppointmentsComponent } from "./my-appointments.component";

const routes: Routes = [

    {
      path: '**',
      component: MyAppointmentsComponent,
      data: {
        title: 'my-appointments',
      }
      , pathMatch: 'full'
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MyAppointmentsRoutingModule { }