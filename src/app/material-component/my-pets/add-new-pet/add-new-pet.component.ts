import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/Entities/customer';
import { Pets} from "../../../Entities/pets";
import { Treatment} from "../../../Entities/treatments";
import { PetService } from 'src/app/Services/pet.service';
import { Message } from 'primeng/api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TreatmentService } from 'src/app/Services/treatment.service';
@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `

  <h3 mat-dialog-title>Confirmation</h3>
  <div mat-dialog-content>
    <p>Please confirm your action</p>
  </div>
  <div mat-dialog-actions>
  <div style="display:flex"> 
  <button mat-raised-button style="color:black; background-color:white ; border-color : #1e88e5;" type="button"(click)="onConfirmClick()" tabindex="2">Confirm</button>
&nbsp;&nbsp;
&nbsp;

    <button mat-raised-button style="color:black; background-color:white ; border-color : #1e88e5;" (click)="onNoClick()" tabindex="-1">No Thanks</button>
    </div>
  </div>`
})
export class CustomConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<CustomConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private petService: PetService, private router: Router
    ,private treatmentService:TreatmentService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirmClick(): void {
    this.petService.saveOwner(this.data.customer).subscribe((data) => {
      this.data.customer = data;
      this.data.pet.customer = this.data.customer;
      this.data.pet.treatments = [];
      this.data.pet.entryDate = new Date();

      this.petService.savePet(this.data.pet).subscribe((data) => {
        this.data.pet = data;
        this.data.treatments.forEach((treatment: { pet: any; }) => {
          treatment.pet = this.data.pet;
          this.treatmentService.saveTreatment(treatment).subscribe((response) => {
            this.data.pet.treatments?.push(response)
            this.petService.updatePetTreatment(this.data.pet).subscribe((response) => {

            })
          })
        })
      })
    })
    this.dialogRef.close();
    this.router.navigate(['/dashboard']).catch();
  }
}
@Component({
  selector: 'app-add-new-pet',
  templateUrl: './add-new-pet.component.html',
  styleUrls: ['./add-new-pet.component.css'],
  styles: [`
      :host ::ng-deep .p-button {
          margin: 0 .5rem 0 0;
          min-width: 10rem;
      }

      p {
          margin: 0;
      }

      .confirmation-content {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color : red;
      }

      :host ::ng-deep .p-dialog .p-button {
          min-width: 6rem;
      }
  `]

})
export class AddNewPetComponent implements OnInit {
  panelOpenState = false;
  treatments: Treatment[] = [];
  step = 0;
  // Error, some.expr may be null or undefined
  petForm!: FormGroup;
  petCategory: any[] = ["Dog", "Cat", "Bird", "Snake", "Frog", "Horse"]
  treatmentType: any[] = ["flea vaccine", "grooming","diagnostic","biological analyzes",""]
  msgs: Message[] = [];
  displayModal: boolean = false;

  ngOnInit() {
    this.treatments.push(new Treatment())
    this.initForm();
    console.log("FORM ", this.petForm.controls["customer"])
  }
  constructor(private formBuilder: FormBuilder, private petService: PetService, public dialog: MatDialog) { }

  initForm() {
    this.petForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstname: [, [Validators.required]],
        lastname: [, [Validators.required]],
        idCard: [, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        phoneNumber: [, [Validators.required]],
      }),
      pet: this.formBuilder.group({
        name: [, [Validators.required]],
        weight: [, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        category: [, [Validators.required]],
      }),
      // Error, some.expr may be null or undefined
      treatmentsForm: this.formBuilder.array([this.initTreatmentForm()])
    });
  }
  initTreatmentForm(): FormGroup {
    return this.formBuilder.group({
      type: '',
      date: '',
      price: [, [Validators.required]]
    });
  }

  // @ts-ignore: Object is possibly 'null'.
  get f(): any { return this.petForm.controls; }
  // Error, some.expr may be null or undefined
  get treatmentFormGroup() {
    return this.petForm.get('treatmentsForm') as FormArray
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  addNewTreatment() {
    // Error, some.expr may be null or undefined
    const add = this.petForm.get('treatmentsForm') as FormArray;
    add.push(this.initTreatmentForm())
  }
  removeTreatment(index: number) {
    // Error, some.expr may be null or undefined
    const add = this.petForm.get('treatmentsForm') as FormArray;
    add.removeAt(index)
  }


  openDialog(): void {

    if (this.petForm.invalid) {
      alert("Check all the form fields")
    } else {
      let customer: Customer = new Customer();
      customer = this.petForm?.value.customer;

      let pet: Pets = new Pets();
      pet = this.petForm?.value.pet;

      let treatments: Treatment[] = []
      treatments = this.petForm?.value.treatmentsForm

      const dialogRef = this.dialog.open(CustomConfirmationDialog, {
        width: '500px',
        data: { customer: customer, pet: pet, treatments: treatments }
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

}
