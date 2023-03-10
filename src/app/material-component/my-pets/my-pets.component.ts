import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/Services/pet.service';
import { TreatmentService } from 'src/app/Services/treatment.service';
import { Pets} from "../../Entities/pets"
import { Treatment} from "../../Entities/treatments"

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.scss']
})
export class MyPetsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', "entry", "actions"];
  pets: Pets[] = [];

  constructor(private petService: PetService, private router: Router,private treatmentService:TreatmentService) {

  }

  ngOnInit() {
    this.petService.getAllPets().subscribe((response) => {
      this.pets = response
    })
    this.checkAllTreatments();
  }

  showDetails(id: number) {
    this.router.navigate([`/pet-information/${id}`]).catch();
  }

  checkAllTreatments() {
    let treatments: Treatment[] = []
    this.treatmentService.getAllTreatments().subscribe((response) => {
      treatments = response;
      treatments.forEach(element => {
        // @ts-ignore: Object is possibly 'null'.
        let date = new Date(element.date);
        let currentDate = new Date();
        var Time = date.getTime() - currentDate.getTime();
        var daysDifference = Time / (1000 * 3600 * 24);
        if (daysDifference >= 1 && daysDifference <= 2) {
        }
      })

    })
  }

}
