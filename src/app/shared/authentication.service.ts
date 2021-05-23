import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

//TODO: rolle + impfstatus im interface hinzufügen
interface Token {
  exp: number;
  user: {
    id: string;
    isAdmin: boolean;
    status: boolean;
    vaccination_id: number;
  };
}

@Injectable()
export class AuthenticationService {
  private api: string =
    'https://impfservice.s1810456023.student.kwmhgb.at/api/auth'; //URL zum REST_Service

  constructor(private http: HttpClient) {} //REST-Calls über HttpClient absetzen

  /**
   * REST-Call absetzen => post, weil wir daten mitschicken
   * dann in backticks api aufrufen, login-methode dranhängen und parameter email + pw mitgeben
   */
  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  /**
   * Token im Local Storage speichern
   * decoden passiert mit dem package jwt-decode
   * wir wollen den token als Token speichern, daher implementieren wir ein eigenes interface
   */
  public setLocalStorage(token: string) {
    localStorage.setItem('token', token);
    const decodedToken = jwt_decode(token) as Token;
    localStorage.setItem('userId', decodedToken.user.id);
    localStorage.setItem('isAdmin', decodedToken.user.isAdmin.toString());
    localStorage.setItem('status', decodedToken.user.status.toString());
    localStorage.setItem(
      'vaccination_id',
      decodedToken.user.vaccination_id.toString()
    );
  }

  public logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('status');
    localStorage.removeItem('vaccination_id');
  }

  public isLoggedIn() {
    //zuerst überprüfen, ob ein token im local storage exisitert
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token'); //token holen
      const decodedToken = jwt_decode(token) as Token; //token decodieren (gleich wie oben)
      let expirationDate: Date = new Date(0); //leeres Datum anlegen
      expirationDate.setUTCSeconds(decodedToken.exp); //im Datum das exp_date des tokens speichern
      if (expirationDate < new Date()) {
        console.log('Unser Token ist expired!'); //überprüfen, ob das token noch gültig ist
        localStorage.removeItem('token'); //wenn das token abgelaufen ist, löschen & false returnen
        return false;
      }
      return true; //token ist in ordnung und gültig
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  public isAdmin() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      if (decodedToken.user.isAdmin) {
        //console.log('User*in ist ein Admin.');
        return true;
      }
      //console.log('User*in ist kein Admin.');
      return false;
    }
    return false;
  }

  public isVaccined() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      if (decodedToken.user.status) {
        //console.log('User*in ist geimpft.');
        return true;
      }
      //console.log('User*in ist nicht geimpft.');
      return false;
    }
    return false;
  }

  public getUserId() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      return decodedToken.user.id;
    }
    return null;
  }
}
