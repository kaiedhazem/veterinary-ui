import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pets} from "../Entities/pets"
import { Treatment} from "../Entities/treatments"
import { PetService } from '../Services/pet.service';
import { Customer } from '../Entities/customer';
import { PetCalendarComponent } from './pet-calendar/pet-calendar.component';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pet-information',
  templateUrl: './pet-information.component.html',
  styleUrls: ['./pet-information.component.css']
})

export class PetInformationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private petService: PetService) { }

  petId: number = 0;
  pet: Pets = new Pets();
  customer: Customer = new Customer();
  petCategory: any[] = ["Dog", "Cat", "Bird", "Snake", "Frog", "Horse"]
  treatments: Treatment[] = [];
  plannedTreatments: Treatment[] = [];
  @ViewChild(PetCalendarComponent, { static: false })
  petCalendar!: PetCalendarComponent;
  mapFilter: Map<string, Object> | undefined;

  ngOnInit(): void {

    this.petId = Number(this.route.snapshot.paramMap.get("id"));

    this.petService.getPetById(this.petId).subscribe((response) => {
      this.pet = response;

      this.pet.treatments?.forEach(treatment => this.getPetTreatments(treatment.id))
      this.getPetOwner(this.pet?.customer?.id)

    })
  }

  getPetOwner(id: number | string | undefined) {
    this.petService.getPetOwnerById(id).subscribe((response) => {
      this.customer = response;
    })
  }
  getPetTreatments(id: number | string | undefined) {
    this.petService.getPetTreatmentById(id).subscribe((response) => {
      this.treatments.push(response)
      this.getplannedTreatment(response)
    })
  }


  getplannedTreatment(treatment: Treatment) {
    // @ts-ignore: Object is possibly 'null'.
    let date = new Date(treatment.date);
    let currentDate = new Date();
    if (date >= currentDate) {
      this.plannedTreatments.push(treatment);
    }
  }

  public exportHtmlToPDF() {

    let data = document.getElementById('htmltable');
    // @ts-ignore: Object is possibly 'null'.

    html2canvas(data).then(canvas => {

      let docWidth = 208;
      let docHeight = canvas.height * docWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let doc = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)

      doc.save(this.pet.name?.toString() + '.pdf');
    });
  }
}

