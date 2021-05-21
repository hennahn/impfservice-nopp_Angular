import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class UserService {
  private api = 'https://impfservice.s1810456023.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Array<User>> {
    return this.http
      .get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingleUser(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any) {
    return throwError(error);
  }
}
