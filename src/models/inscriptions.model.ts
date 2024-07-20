import connection from "../../utils/connection";
import { TypeInscription, TypeQueryResult } from "../../utils/types";

export interface InscriptionResult {
    success: boolean,
    message?: string,
    data?: TypeInscription | TypeInscription[]
}

// export async function readInscriptions(): Promise<TypeInscription[]> {
//     return new Promise((resolve, reject) => {
//         const query = "SELECT * FROM inscriptions";
//         connection.query(query, (err, result) => {
//             if (err) reject(err);
//             resolve(result as Array<TypeInscription>);
//         })
//     })
// }
export async function readInscriptions(): Promise<TypeInscription[]> {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                i.*, 
                p.documentnumber AS person_documentnumber, 
                p.personname AS person_name, 
                p.personlastname AS person_lastname, 
                p.iddocumenttype AS person_documenttype, 
                p.address AS person_address, 
                p.phonenumber AS person_phonenumber, 
                p.birthdate AS person_birthdate, 
                p.idparent AS person_idparent, 
                p.username AS person_username, 
                p.userpass AS person_userpass,
                w.idworkshop AS workshop_idworkshop,
                w.workshopname AS workshop_workshopname,
                w.workdescription AS workshop_workdescription,
                w.idinstructor AS workshop_idinstructor,
                w.costfirst AS workshop_costfirst,
                w.costsecond AS workshop_costsecond,
                w.costthird AS workshop_costthird,
                w.workshopschedule AS workshop_workshopschedule,
                w.startsin AS workshop_startsin,
                w.endsin AS workshop_endsin,
                w.capacity AS workshop_capacity,
                w.state AS workshop_state
            FROM 
                inscriptions i
            JOIN 
                people p ON i.idstudent = p.documentnumber
            JOIN
                workshops w ON i.idworkshop = w.idworkshop
        `;
        connection.query(query, (err, result) => {
            if (err) reject(err);

            if (Array.isArray(result)) {
                const formattedResult = result.map((row: any) => ({
                    idinscription: row.idinscription,
                    idworkshop: row.idworkshop,
                    idstudent: row.idstudent,
                    inscripciondate: row.inscripciondate,
                    cost: row.cost,
                    state: row.state,
                    isrequiredfirstdoc: row.isrequiredfirstdoc,
                    namefirstdoc: row.namefirstdoc,
                    filefirstdoc: row.filefirstdoc,
                    isrequiredseconddoc: row.isrequiredseconddoc,
                    nameseconddoc: row.nameseconddoc,
                    fileseconddoc: row.fileseconddoc,
                    isrequiredthirddoc: row.isrequiredthirddoc,
                    namethirddoc: row.namethirddoc,
                    filethirddoc: row.filethirddoc,
                    person: {
                        documentnumber: row.person_documentnumber,
                        personname: row.person_name,
                        personlastname: row.person_lastname,
                        iddocumenttype: row.person_documenttype,
                        address: row.person_address,
                        phonenumber: row.person_phonenumber,
                        birthdate: row.person_birthdate,
                        idparent: row.person_idparent,
                        username: row.person_username,
                        userpass: row.person_userpass
                    },
                    workshop: {
                        idworkshop: row.workshop_idworkshop,
                        workshopname: row.workshop_workshopname,
                        workdescription: row.workshop_workdescription,
                        idinstructor: row.workshop_idinstructor,
                        costfirst: row.workshop_costfirst,
                        costsecond: row.workshop_costsecond,
                        costthird: row.workshop_costthird,
                        workshopschedule: row.workshop_workshopschedule,
                        startsin: row.workshop_startsin,
                        endsin: row.workshop_endsin,
                        capacity: row.workshop_capacity,
                        state: row.workshop_state
                    }
                }));
                resolve(formattedResult as Array<TypeInscription>);
            } else {
                reject(new Error("Expected an array result from the database query"));
            }
        });
    });
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