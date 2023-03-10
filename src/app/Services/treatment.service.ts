import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';


const URL_TREATMENT=  "http://localhost:8092/api/v1/treatments";
@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  constructor(private http: HttpClient) {

  }
  getAllTreatments(): Observable<any> {
    return this.http.get<any>(URL_TREATMENT)
  }
  getPetTreatmentById(id:number|string|undefined): Observable<any> {
    return this.http.get<any>(URL_TREATMENT+"/"+id)
  }
  deleteTreatmentById(id:number): Observable<any> {
    return this.http.delete<any>(URL_TREATMENT+"/"+id)
  }
  saveTreatment(treatment:any): Observable<any> {
    return this.http.post<any>(URL_TREATMENT,treatment)
  }
  updateTreatment(treatment:any): Observable<any> {
    return this.http.put<any>(URL_TREATMENT,treatment)
  }

}
