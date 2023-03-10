import { Component, OnInit } from '@angular/core';
import { TreatmentService } from 'src/app/Services/treatment.service';
import { Treatment} from "../Entities/treatments"
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-my-treatments',
  templateUrl: './my-treatments.component.html',
  styleUrls: ['./my-treatments.component.css']
})
export class MyTreatmentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'date', 'status', "price", "actions"];
  treatment: Treatment[] = [];
  ajoutTreatmentForm !: FormGroup;
  modifierTreatmentForm !: FormGroup;
  objectToEdit: any;
  idSupp: any;
  dataSource: MatTableDataSource<any>;
  constructor(private treatmentService: TreatmentService, private router: Router,public dialog: MatDialog, private formBuilder : FormBuilder,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.treatmentService.getAllTreatments().subscribe((response) => {
      this.treatment = response
      this.dataSource = response
    })
    this.ajoutTreatmentForm = this.formBuilder.group(
      {
        
       type : ['', Validators.required] ,
       date : ['', Validators.required] ,
       status : ['', Validators.required] ,
       price :['', Validators.required] 
      })
    //this.checkAllTreatments();
  }

  showDetails(id: number) {
   // this.router.navigate([`/pet-information/${id}`]).catch();
  }
  openDialog(mymodal: any, row: any) {
    const dialogRef = this.dialog.open(mymodal, {
      width: '30%'
    });
    if(row){
      this.objectToEdit = row;
      console.log(this.objectToEdit);
      this.modifierTreatmentForm = this.formBuilder.group(
        {
          id: [this.objectToEdit.id ],
          type : [this.objectToEdit.type ] ,
          date : [this.objectToEdit.date] ,
          status :[this.objectToEdit.status] ,
          price :[this.objectToEdit.price]
        })
        
    }
  }

  openSuppDialog(mymodal: any, id: any) {
    const dialogRef = this.dialog.open(mymodal, {
      width: '30%'
    });
    this.idSupp = id;
  }

  ajouterTreatment(): void {
    console.log(this.ajoutTreatmentForm.value);
    
      this.treatmentService.saveTreatment(this.ajoutTreatmentForm.value)
      .subscribe({
        next:(res)=>{
          this.ajoutTreatmentForm.reset();
          this.dialog.closeAll();
          this.openSnackBar("Treatment ajouté avec succés!!", "Ok");
          this.ngOnInit();
        },
        error:()=>{
          this.ajoutTreatmentForm.reset();
          this.dialog.closeAll();
          this.openSnackBar("Erreur d'ajout!!", "OOPS");
        }
      })
    
  }

  modifierTreatment() {
    console.log(this.objectToEdit);
    if(this.modifierTreatmentForm.valid)
    {
      this.treatmentService.updateTreatment(this.modifierTreatmentForm.value)
      .subscribe({
        next:(res)=>{
          this.modifierTreatmentForm.reset();
          this.dialog.closeAll();
          this.openSnackBar("Treatment modifié avec succés!!", "Ok");
          this.ngOnInit();
        },
        error:()=>{
          this.modifierTreatmentForm.reset();
          this.dialog.closeAll();
          this.openSnackBar("Treatment modifié avec succés!!", "Ok");
          this.ngOnInit();
        }
      })
    }
  }

  supprimerTreatement(){
    this.treatmentService.deleteTreatmentById(this.idSupp)
    .subscribe({
      next:(res)=>{
        this.dialog.closeAll();
        this.openSnackBar("Treatement supprimé avec succés!!", "Ok");
        this.ngOnInit();
      },
      error:()=>{
        this.dialog.closeAll();
        this.openSnackBar("Treatment supprimé avec succés!!", "Ok");
        this.ngOnInit();
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
