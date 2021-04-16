import { Vaccination } from "./vaccination";

export class VaccinationFactory {
  static empty(): Vaccination {
    return new Vaccination(null, new Date(), new Date(), 0, null); //TODO: location_id soll hier mitgegeben werden, vorerst null
  }

  //erzeugt ein leeres vaccination objekt aus untypisiertem json
  static fromObject(rawVaccination: any): Vaccination {
    return new Vaccination(
      rawVaccination.id,
      typeof rawVaccination.from === "string"
        ? new Date(rawVaccination.from)
        : rawVaccination.from,
      typeof rawVaccination.to === "string"
        ? new Date(rawVaccination.to)
        : rawVaccination.to,
      rawVaccination.maxParticipants,
      rawVaccination.location_id
    );
  }
}
