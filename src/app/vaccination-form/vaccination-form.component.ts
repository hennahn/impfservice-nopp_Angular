import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { Vaccination } from '../shared/vaccination';
import { VaccinationFormErrorMessages } from './vaccination-form-error-messages';
import { ImpfserviceService } from '../shared/impfservice.service';
import { Location } from '../shared/location';
import { LocationService } from '../shared/location.service';
import { DatePipe } from '@angular/common';
import { VaccinationValidators } from '../shared/vaccination-validators';

@Component({
  selector: 'is-vaccination-form',
  templateUrl: './vaccination-form.component.html'
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty(); //leeren Termin initial anlegen
  errors: { [key: string]: string } = {};
  isUpdatingVaccination = false; //einen bestehenden Termin updaten ja/nein
  locations: Location[];

  constructor(
    private fb: FormBuilder,
    private is: ImpfserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private ls: LocationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    //hat der Termin bereits einen param id oder nicht (ja->existiert schon)
    const id = this.route.snapshot.params['id']; //id aus der route holen
    this.ls.getAllLocations().subscribe(locations => {
      //locations holen
      this.locations = locations;
    });
    if (id) {
      this.isUpdatingVaccination = true; //Termin gibt es schon -> möchte ich updaten
      this.is.getSingleVaccination(id).subscribe(vaccination => {
        //Daten holen mit der id vom gefundenen Termin
        this.vaccination = vaccination;
        this.initVaccination(); //init nochmal ausführen, weil asynchron!
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    //Formular Model bauen
    this.vaccinationForm = this.fb.group({
      //id: this.vaccination.id,
      from: [this.datePipe.transform(this.vaccination?.from, "yyyy-MM-dd HH:mm:ss"), [Validators.required, VaccinationValidators.checkDate]],
      to: [this.datePipe.transform(this.vaccination?.to, "yyyy-MM-dd HH:mm:ss"), [Validators.required]],
      maxParticipants: [this.vaccination.maxParticipants, [Validators.required, , Validators.min(1)]],
      location: [this.vaccination.location_id, [Validators.required]]
    });
    this.vaccinationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.vaccinationForm.invalid);
    this.errors = {};
    for (const message of VaccinationFormErrorMessages) {
      const control = this.vaccinationForm.get(message.forControl); //Control finden und speichern
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    /*this.vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );*/
    const val = this.vaccinationForm.value;

    //werte direkt auslesen, die ich für das reactive form gesetzt habe
    this.vaccination.from = val.from;
    this.vaccination.to = val.to;
    this.vaccination.location_id = val.location;
    this.vaccination.maxParticipants = val.maxParticipants;
    console.log(this.vaccination);

    if (this.isUpdatingVaccination) {
      //wenn es sich um einen bestehenden Termin handelt 
      this.is.updateVaccination(this.vaccination).subscribe(res => {
        this.router.navigate(['../../vaccinations', this.vaccination.id], {
          relativeTo: this.route
        });
      });
    } else {
      //wenn es sich um einen neuen Termin handelt
      this.is.createVaccination(this.vaccination).subscribe(res => {
        this.router.navigate(['../vaccinations'], {
          relativeTo: this.route
        });
      });
    }
  }
}