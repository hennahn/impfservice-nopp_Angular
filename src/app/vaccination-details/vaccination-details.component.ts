import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from '../shared/vaccination';
import { User } from '../shared/user';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { ImpfserviceService } from '../shared/impfservice.service';
import { AuthenticationService } from '../shared/authentication.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'is-vaccination-details',
  templateUrl: './vaccination-details.component.html'
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();
  user: User;

  constructor(
    private is: ImpfserviceService,
    private us: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.is
      .getSingleVaccination(params['id'])
      .subscribe(res => (this.vaccination = res));
    this.us.getSingleUser(this.authService.getUserId()).subscribe(user => {
      this.user = user;
    });
    //console.log(typeof this.user?.vaccination);
  }

  removeVaccination() {
    if (confirm('Termin wirklich löschen?')) {
      this.is
        .removeVaccination(this.vaccination.id)
        .subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route })
        );
    }
  }

  bookVaccination() {
    if (confirm('Möchten Sie diesen Termin wirklich buchen?')) {
      const vaccinationId = this.route.snapshot.params['id'];
      const userId = this.user.id;
      this.is
        .bookVaccination(userId, vaccinationId)
        .subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route })
        );
    }
  }
}
