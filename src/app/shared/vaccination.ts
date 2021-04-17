import { Location } from "./location";
export { Location } from "./location";

export class Vaccination {
  constructor(
    public id: String,
    public from: Date,
    public to: Date,
    public maxParticipants: number,
    public location: Location
  ) {}
}
