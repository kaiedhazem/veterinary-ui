import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

const URL_PET=  "http://localhost:8092/api/v1/pets";
const URL_TREATMENT=  "http://localhost:8092/api/v1/treatments";

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private http: HttpClient) {

  }

  getAllPets(): Observable<any> {
    return this.http.get<any>(URL_PET)
  }
  getAllTreatments(): Observable<any> {
    return this.http.get<any>(URL_TREATMENT)
  }
  getPetById(id:number): Observable<any> {
    return this.http.get<any>(URL_PET+"/"+id)
  }
  
  getPetTreatmentById(id:number|string|undefined): Observable<any> {
    return this.http.get<any>(URL_TREATMENT+"/"+id)
  }
  deleteTreatmentById(id:number): Observable<any> {
    return this.http.delete<any>(URL_TREATMENT+"/"+id)
  }
  deletePetById(id:number): Observable<any> {
    return this.http.delete<any>(URL_PET+"/"+id)
  }
  savePet(pet:any): Observable<any> {
    return this.http.post<any>(URL_PET,pet)
  }
  saveTreatment(treatment:any): Observable<any> {
    return this.http.post<any>(URL_TREATMENT,treatment)
  }
  updatePetTreatment(pet:any): Observable<any> {
    return this.http.put<any>(URL_PET,pet)
  }
  updateTreatment(treatment:any): Observable<any> {
    return this.http.put<any>(URL_TREATMENT,treatment)
  }

  /********************************************************************* */
  saveOwner(owner:any): Observable<any> {
    return this.http.post<any>(` http://localhost:3000/owner`,owner)
  }
  getPetOwnerById(id:number|string|undefined): Observable<any> {
    return this.http.get<any>(` http://localhost:3000/owner/${id}`)
  }
}