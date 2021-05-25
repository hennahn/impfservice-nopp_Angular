export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const VaccinationFormErrorMessages = [
  new ErrorMessage('from', 'required', 'Bitte geben Sie ein Startdatum an.'),
  new ErrorMessage(
    'from',
    'checkDate',
    'Das Startdatum muss vor dem Enddatum liegen.'
  ),
  new ErrorMessage('to', 'required', 'Bitte geben Sie ein Enddatum an.'),
  new ErrorMessage(
    'from',
    'checkDate',
    'Das Enddatum muss nach dem Startdatum liegen.'
  ),
  new ErrorMessage(
    'maxParticipants',
    'required',
    'Bitte geben Sie eine maximale Anzahl an Teilnerhmer*innen an.'
  ),
  new ErrorMessage(
    'maxParticipants',
    'min',
    'Zu dem Impftermin muss sich mindesten 1 Teilnehmer*in anmelden können.'
  ),
  new ErrorMessage('location', 'required', 'Bitte geben Sie einen Ort an.')
];

//TODO: Date Validator bauen
