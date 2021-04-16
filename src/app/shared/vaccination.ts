import { Location } from "./location";
export { Location } from "./location";

export class Vaccination {
  constructor(
    public id: number,
    public from: Date,
    public to: Date,
    public maxParticipants: number,
    public location_id: Location
  ) {}
}
