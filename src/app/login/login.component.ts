import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

interface Response {
  access_token: string;
}

@Component({
  selector: 'is-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      //zu beginn leer initiieren
      username: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.loginForm.value;
    //zur sicherheit nochmal abfragen, ob username (email) + pw eh gesetzt sind
    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(res => {
        //token im local storage ablegen (nicht sehr sicher, aber einfach zu implementieren)
        //lästige fehler vermeiden: interface "Response" definieren, dann "res" als "Result" casten und access_token als string vom token holen
        this.authService.setLocalStorage((res as Response).access_token);
      });
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn(); //weiterleiten ans Service (fkt im service implementiert)
  }

  logout() {
    this.authService.logout(); //weiterleiten ans Service (fkt im service implementiert)
  }
}
