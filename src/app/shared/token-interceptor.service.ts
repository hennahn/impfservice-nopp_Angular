import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

//Info: HTTP Interceptors schalten sich bei jedem Http-Call dazwischen

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      //von jedem request wird zuerst eine kopier erstellt
      setHeaders: {
        //in dieser kopie werden die headers neu gesetzt => in dem fall den Bearer Token, den wir uns aus dem LocalStorage holen
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return next.handle(request); //hier wird der request an den server weitergeschickt
  }
}
