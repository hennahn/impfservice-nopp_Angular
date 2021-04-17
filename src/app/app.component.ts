import { Component, VERSION } from "@angular/core";

@Component({
  selector: "is-root", //is für impfservice
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
}