import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "is-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // beachten wir hier nicht
  ngOnInit() {}
}
