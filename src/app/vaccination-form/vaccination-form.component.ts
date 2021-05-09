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
//import { VaccinationsValidators } from "../shared/vaccination-validators";

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
  /* ALT
  location = [
    { id: 1, location: 'Sportpark Walding' },
    { id: 2, location: 'Design Center Linz' },
    { id: 3, location: 'Ausbildungszentrum Kepler Universitätsklinikum' }
  ];*/

  constructor(
    private fb: FormBuilder,
    private is: ImpfserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private ls: LocationService
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
      id: this.vaccination.id,
      from: [this.vaccination.from, [Validators.required]],
      to: [this.vaccination.to, [Validators.required]],
      maxParticipants: this.vaccination.maxParticipants,
      location: this.vaccination.location
    });
    this.vaccinationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  updateErrorMessages() {
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
    const updatedVaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );
    console.log(updatedVaccination);

    if (this.isUpdatingVaccination) {
      this.is.updateVaccination(updatedVaccination).subscribe(res => {
        this.router.navigate(['../../vaccinations', updatedVaccination.id], {
          relativeTo: this.route
        });
      });
    } else {
      this.is.createVaccination(updatedVaccination).subscribe(res => {
        this.router.navigate(['../vaccinations'], {
          relativeTo: this.route
        });
      });
    }
  }
}
