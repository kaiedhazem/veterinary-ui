import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyTreatmentsComponent } from "./my-treatments.component";

const routes: Routes = [

    {
      path: '**',
      component: MyTreatmentsComponent,
      data: {
        title: 'my-treatmentes',
      }
      , pathMatch: 'full'
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MyTreatmentsRoutingModule { }