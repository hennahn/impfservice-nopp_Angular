import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Vaccination } from "../shared/vaccination";
import { VaccinationFactory } from "../shared/vaccination-factory";
import { ImpfserviceService } from "../shared/impfservice.service";

@Component({
  selector: "is-vaccination-details",
  templateUrl: "./vaccination-details.component.html"
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();

  constructor(
    private is: ImpfserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.is
      .getSingleVaccination(params["id"])
      .subscribe(res => (this.vaccination = res));
  }
}
