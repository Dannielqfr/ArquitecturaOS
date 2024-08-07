import { TypePerson } from "../../utils/types";
import { PersonResult, deletePerson, getAllPeople, postPerson, putPerson } from "../models/person.model";
import bcrypt from 'bcrypt';

export class PersonService {
  private readonly people: TypePerson[];

  constructor() {
    this.people = [];
  }

  async #encrypt(passToEncrypt: string): Promise<string | null> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(passToEncrypt, salt);
      return hash;
    } catch (error) {
      console.log("Error AuthService_Encrypt: ", error);
      return null
    }
  }

  #validate(person: TypePerson): boolean {
    if (typeof person.personname === "undefined") return false;
    if (typeof person.personlastname === "undefined") return false;
    if (typeof person.iddocumenttype === "undefined") return false;
    if (typeof person.address === "undefined") return false;
    if (typeof person.phonenumber === "undefined") return false;
    if (typeof person.birthdate === "undefined") return false;
    //if (typeof person.idparent === "undefined") return false;
    if (!person.personname || !person.personlastname || !person.iddocumenttype)
      return false;
    return true;
  }

  async create(person: TypePerson): Promise<PersonResult> {
    if (!this.#validate(person))
      return { success: false, message: "Error verificar datos enviados." };
    try {
      if (person && person.userpass) {
        const encoded = await this.#encrypt(person.userpass);
        if (!encoded) {
          return { success: false, message: "Error, contactar al administrador." };
        }
        person.userpass = encoded
      }
      const createdPerson = await postPerson(person);
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

  async read(): Promise<PersonResult> {
    try {
      const people = await getAllPeople()
      return {
        success: true,
        data: people,
        message: "Lista de personas obtenida correctamente"
      }
    } catch (error) {
      console.error(error)
      return { success: false, message: "Error al obtener la lista de personas" }
    }
  }

  async getById(id: string): Promise<PersonResult> {
    try {
      const person = this.people.find((person) => person.documentnumber === id);
      if (!person) return { success: false, message: "Persona no encontrada" };
      return { success: true, data: person, message: "Persona encontrada" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error al obtener la persona" };
    }
  }
  async deleteById(id: string): Promise<PersonResult> {
    try {
      const person = this.people.find((person) => person.documentnumber === id);
      if (!person) return { success: false, message: "Persona no encontrada" };
      this.people.splice(this.people.indexOf(person), 1);
      const affectedRows = await deletePerson(id)
      if (affectedRows === 0) return { success: false, message: "Persona no eliminada" };
      return { success: true, message: "Persona eliminada correctamente" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error al eliminar la persona" };
    }
  }
  async updateById(id: string, person: TypePerson): Promise<PersonResult> {
    try {
      const people = await getAllPeople()
      const index = people.findIndex((person) => person.documentnumber === id);
      //const index = this.people.findIndex((person) => person.documentnumber === id);
      if (index === -1) return { success: false, message: "Persona no encontrada" };
      this.people[index] = person;
      const affectedRows = await putPerson(person, id)
      if (affectedRows === 0) return { success: false, message: "Persona no actualizada" };
      return { success: true, message: "Persona actualizada correctamente" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error al actualizar la persona" };
    }
  }

  async getByUsername(username: string): Promise<PersonResult> {
    try {
      const pp = await getAllPeople()
      const person = pp.find((person) => person.username === username);
      if (!person) return { success: false, message: "Usuario no encontrado" };
      return { success: true, data: person, message: "Usuario encontrado" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error al obtener usuario" };
    }
  }

}
