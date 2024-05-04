import connection from "../../utils/connection";
import { TypePerson, TypeQueryResult } from "../../utils/types";

export interface PersonResult {
  success: boolean;
  data?: TypePerson | TypePerson[];
  message?: string;
}

export async function getAllPeople(): Promise<TypePerson[]> {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM people";
    connection.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results as Array<TypePerson>);
    });
  });
}

export async function postPerson(person: TypePerson): Promise<number> {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO people (documentnumber, personname, personlastname,iddocumenttype, address, phonenumber, birthdate, idparent) VALUES ("${person.documentnumber}","${person.personname}","${person.personlastname}",${person.iddocumenttype},"${person.address}","${person.phonenumber}",${person.birthdate},${person.idparent});`;
    const query2 = `INSERT INTO people (documentnumber, personname, personlastname,iddocumenttype, address, phonenumber, birthdate, idparent) VALUES (?,?,?,?,?,?,?,?);`;
    const values = [
      person.documentnumber,
      person.personname,
      person.personlastname,
      person.iddocumenttype,
      person.address,
      person.phonenumber,
      person.birthdate,
      person.idparent,
    ];
    connection.query(query2, values, (err, results) => {
      const r: TypeQueryResult = results as TypeQueryResult;
      if (err) reject(err);
      else resolve(r.insertId);
    });
  });
}

export async function putPerson(person: TypePerson): Promise<number> {
  return new Promise((resolve, reject) => {
    const query = `UPDATE people SET personname="${person.personname}", personlastname="${person.personlastname}", iddocumenttype=${person.iddocumenttype},address="${person.address}", phonenumber=${person.phonenumber}, birthdate="${person.birthdate}", idparent="${person.idparent}" WHERE documentnumber="${person.documentnumber}";`;
    connection.query(query, (err, results) => {
      const r: TypeQueryResult = results as TypeQueryResult;
      if (err) reject(err);
      else resolve(r.affectedRows);
    });
  });
}
