import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
//import { VaccinationFormErrorMessages } from "./vaccination-form-error-messages";
import { VaccinationFactory } from '../shared/vaccination-factory';
import { ImpfserviceService } from '../shared/impfservice.service';
//import { VaccinationsValidators } from "../shared/vaccination-validators";
//TODO: LocationService

@Component({
  selector: 'is-vaccination-form',
  templateUrl: './vaccination-form.component.html'
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  errors: { [key: string]: string } = {};
  //isUpdatingVaccination = false;

  constructor(
    private fb: FormBuilder,
    private is: ImpfserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) //TODO: Location Service
  {}

  ngOnInit() {}

  submitForm() {}
}
