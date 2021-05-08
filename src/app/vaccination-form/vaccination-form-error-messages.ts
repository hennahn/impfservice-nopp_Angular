export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const VaccinationFormErrorMessages = [
  new ErrorMessage('from', 'required', 'Bitte geben Sie ein Startdatum an.'),
  new ErrorMessage('to', 'required', 'Bitte geben Sie ein Enddatum an.'),
  new ErrorMessage(
    'maxParticipants',
    'required',
    'Bitte geben Sie eine maximale Anzahl an Teilnerhmer*innen an.'
  )
  //new ErrorMessage("location", "required", "Bitte geben Sie einen Impfort an."),
];
