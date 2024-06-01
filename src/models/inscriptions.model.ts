import connection from "../../utils/connection";
import { TypeInscription, TypeQueryResult } from "../../utils/types";

export interface InscriptionResult {
    success: boolean,
    message?: string,
    data?: TypeInscription | TypeInscription[]
}

export async function readInscriptions(): Promise<TypeInscription[]> {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM inscriptions";
        connection.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result as Array<TypeInscription>);
        })
    })
}

export async function createInscription(inscription: TypeInscription): Promise<number> {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO inscriptions (
            idstudent,
            inscripciondate,
            cost,
            state,
            isrequiredfirstdoc,
            namefirstdoc,
            filefirstdoc,
            isrequiredseconddoc,
            nameseconddoc,
            fileseconddoc,
            isrequiredthirddoc,
            namethirddoc,
            filethirddoc,
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`;
        const values = [
            inscription.idstudent,
            inscription.inscripciondate,
            inscription.cost,
            inscription.state,
            inscription.isrequiredfirstdoc,
            inscription.namefirstdoc,
            inscription.filefirstdoc,
            inscription.isrequiredseconddoc,
            inscription.nameseconddoc,
            inscription.fileseconddoc,
            inscription.isrequiredthirddoc,
            inscription.namethirddoc,
            inscription.filethirddoc,
        ]
        connection.query(query, values, (err, result) => {
            const r: TypeQueryResult = result as TypeQueryResult;
            if (err) reject(err);
            resolve(r.insertId);
        })
    })
}

export async function deleteInscription(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM inscriptions WHERE idinscription = ${id}`;
        connection.query(query, (err, result) => {
            if (err) reject(err);
            resolve(true);
        })
    })
}

export async function updateInscription(inscription: TypeInscription, idinscription: number): Promise<number> {
    return new Promise((resolve, reject) => {
        const query = `UPDATE inscriptions SET 
            idstudent = ?,
            inscripciondate = ?,
            cost = ?,
            state = ?,
            isrequiredfirstdoc = ?,
            namefirstdoc = ?,
            filefirstdoc = ?,
            isrequiredseconddoc = ?,
            nameseconddoc = ?,
            fileseconddoc = ?,
            isrequiredthirddoc = ?,
            namethirddoc = ?,
            filethirddoc = ?
            WHERE idinscription = ?;`;
        const values = [
            inscription.idstudent,
            inscription.inscripciondate,
            inscription.cost,
            inscription.state,
            inscription.isrequiredfirstdoc,
            inscription.namefirstdoc,
            inscription.filefirstdoc,
            inscription.isrequiredseconddoc,
            inscription.nameseconddoc,
            inscription.fileseconddoc,
            inscription.isrequiredthirddoc,
            inscription.namethirddoc,
            inscription.filethirddoc,
            idinscription]
        connection.query(query, values, (err, result) => {
            const r: TypeQueryResult = result as TypeQueryResult;
            if (err) reject(err);
            resolve(r.affectedRows);
        })
    })
}