import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { ImpfserviceService } from '../shared/impfservice.service';
import { Vaccination } from '../shared/vaccination';
import { VaccinationFormErrorMessages } from './vaccination-form-error-messages';
//import { VaccinationsValidators } from "../shared/vaccination-validators";
//TODO: LocationService

@Component({
  selector: 'is-vaccination-form',
  templateUrl: './vaccination-form.component.html'
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty(); //leeren Termin initial anlegen
  errors: { [key: string]: string } = {};
  isUpdatingVaccination = false; //einen bestehenden Termin updaten ja/nein

  constructor(
    private fb: FormBuilder,
    private is: ImpfserviceService,
    private route: ActivatedRoute,
    private router: Router //TODO: Location Service
  ) {}

  ngOnInit() {
    //hat der Termin bereits einen param id oder nicht (ja->existiert schon)
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingVaccination = true; //Termin gibt es schon -> möchte ich updaten
      this.is.getSingleVaccination(id).subscribe(vaccination => {
        //Termin Daten holen mit der id vom gefundenen Termin
        this.vaccination = vaccination;
        this.initVaccination(); //initBook nochmal ausführen, weil asynchron!
      });
    }
    this.initVaccination();
  }

  initVaccination() {
    //Formular Model bauen
    this.vaccinationForm = this.is.group({
      id: this.vaccination.id,
      from: [this.vaccination.from, [Validators.required]],
      to: [this.vaccination.to, [Validators.required]],
      maxParticipants: this.vaccination.maxParticipants
      //TODO: LOCATION
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
        //es geht darum das fehlerhafte feld zu finden und zu checken, ob mit dem feld schon interagiert wurde, damit man nicht errors schmeisst, wenn jmd noch gar nicht interagiert hat. Es wird die erste Fehlermeldung angezeigt, die er findet (nicht alle)
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
