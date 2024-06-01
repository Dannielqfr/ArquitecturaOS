import connection from "../../utils/connection";
import { TypeQueryResult, TypeWorkshop } from "../../utils/types";

export interface WorkshopResult {
    success: boolean;
    data?: TypeWorkshop | TypeWorkshop[];
    message?: string;
}

export async function readWorkshops(): Promise<TypeWorkshop[]> {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM workshops";
        connection.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results as Array<TypeWorkshop>);
        })
    })
}

export async function createWorkshop(workshop: TypeWorkshop): Promise<number> {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO workshops (workshopname, workdescription,idinstructor,costfirst,costsecond,costthird,workshopschedule,startsin,endsin,capacity,state)
        VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
        const values = [workshop.workshopname, workshop.workdescription, workshop.idinstructor, workshop.costfirst, workshop.costsecond, workshop.costthird, workshop.workshopschedule, workshop.startsin, workshop.endsin, workshop.capacity, workshop.state];
        connection.query(query, values, (err, results) => {
            const r: TypeQueryResult = results as TypeQueryResult
            if (err) reject(err);
            else resolve(r.insertId);
        })
    })
}

export async function updateWorkshop(workshop: TypeWorkshop, id: number): Promise<number> {
    return new Promise((resolve, reject) => {
        const query = `UPDATE workshops SET workshopname="${workshop.workshopname}", workdescription="${workshop.workdescription}", idinstructor=${workshop.idinstructor}, costfirst=${workshop.costfirst}, costsecond=${workshop.costsecond}, costthird=${workshop.costthird}, workshopschedule="${workshop.workshopschedule}", startsin="${workshop.startsin}", endsin="${workshop.endsin}", capacity=${workshop.capacity}, state="${workshop.state}" WHERE idworkshop=${id};`;
        connection.query(query, (err, results) => {
            const r: TypeQueryResult = results as TypeQueryResult
            if (err) reject(err);
            else resolve(r.affectedRows);
        })
    })
}

export async function deleteWorkshop(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM workshops WHERE idworkshop=${id};`;
        connection.query(query, (err, results) => {
            const r: TypeQueryResult = results as TypeQueryResult
            if (err) reject(err);
            else resolve(r.affectedRows);
        })
    })
}