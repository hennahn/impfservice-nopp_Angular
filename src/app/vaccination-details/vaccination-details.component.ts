import { Component, OnInit } from "@angular/core";
import { Vaccination } from "../shared/vaccination";
import { ImpfserviceService } from "../shared/impfservice.service";

@Component({
  selector: "is-vaccination-details",
  templateUrl: "./vaccination-details.component.html"
})
export class VaccinationDetailsComponent implements OnInit {
  ngOnInit() {}
}
