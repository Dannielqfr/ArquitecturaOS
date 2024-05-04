import { TypePerson } from "../../utils/types";
import { PersonResult, postPerson } from "../models/person.model";

export class PersonService {
  private readonly people: TypePerson[];

  constructor() {
    this.people = [];
  }

  #validate(person: TypePerson): boolean {
    if (typeof person.personname === "undefined") return false;
    if (typeof person.personlastname === "undefined") return false;
    if (typeof person.iddocumenttype === "undefined") return false;
    if (typeof person.address === "undefined") return false;
    if (typeof person.phonenumber === "undefined") return false;
    if (typeof person.birthdate === "undefined") return false;
    if (typeof person.idparent === "undefined") return false;
    if (!person.personname || !person.personlastname || !person.iddocumenttype)
      return false;
    return true;
  }

  async create(person: TypePerson): Promise<PersonResult> {
    if (!this.#validate(person))
      return { success: false, message: "Error verificar datos enviados." };
    try {
      const idperson = await postPerson(person);
      return {
        success: true,
        message: "Persona creada correctamente",
        data: person,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error al crear una persona" };
    }
  }
}
