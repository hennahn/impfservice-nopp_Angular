import { Component, OnInit } from "@angular/core";
import { ImpfserviceService } from "../shared/impfservice.service";
import { Location } from "../shared/location";
import { Vaccination } from "../shared/vaccination";
import { User } from "../shared/user";

@Component({
  selector: "is-vaccination-list",
  templateUrl: "./vaccination-list.component.html"
})
export class VaccinationListComponent implements OnInit {
  vaccinations: Vaccination[];

  constructor(private is: ImpfserviceService) {}

  ngOnInit() {
    this.is.getAllVaccinations().subscribe(res => (this.vaccinations = res));
  }
}
