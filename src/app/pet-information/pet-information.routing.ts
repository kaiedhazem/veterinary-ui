import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PetInformationComponent } from "./pet-information.component";

const routes: Routes = [

    {
      path: ':id',
      redirectTo: ':id',
    },
    {
      path: ':id',
      component: PetInformationComponent,
      data: {
        title: 'pet-information',
      }
    },
    {
      path: '**',
      component: PetInformationComponent,
      data: {
        title: 'pet-information',
      }
      , pathMatch: 'full'
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PetInFormationRoutingModule { }