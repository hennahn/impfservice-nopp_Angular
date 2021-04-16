import { Vaccination } from "./vaccination";
export { Vaccination } from "./vaccination";

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public sex: string,
    public password: string,
    public email: string,
    public ssno: string,
    public isAdmin: boolean,
    public status: boolean,
    public vaccination_id?: number,
    public phone?: string,
    public street?: string,
    public zipCode?: string,
    public houseNo?: string,
    public city?: string
  ) {}
}
