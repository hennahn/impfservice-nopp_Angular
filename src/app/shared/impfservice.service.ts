import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Location } from "./location";
import { Vaccination } from "./vaccination";
import { User } from "./user";

@Injectable()
export class ImpfserviceService {
  private api = "https://impfservice.s1810456023.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {}

  getAllVaccinations(): Observable<Array<Vaccination>> {
    return this.http
      .get<Array<Vaccination>>(`${this.api}/vaccinations`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingleVaccination(id: Number): Observable<Vaccination> {
    return this.http
      .get<Vaccination>(`${this.api}/vaccinations/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  removeVaccination(id: Number): Observable<any> {
    return this.http
      .delete(`${this.api}/vaccinations/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  createVaccination(vaccination: Vaccination): Observable<any> {
    return this.http
      .post(`${this.api}/vaccinations`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateVaccination(vaccination: Vaccination): Observable<any> {
    return this.http
      .put(`${this.api}/vaccinations/${vaccination.id}`, vaccination)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any) {
    return throwError(error);
  }

  /*check(id: Number): Observable<Boolean> {
    return this.http
      .get<Boolean>(`${this.api}/vaccinations/checkId/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }*/
}
