import connection from "../../utils/connection";
import { TypePayments, TypeQueryResult } from "../../utils/types";

export interface PaymentResult {
    success: boolean,
    data?: TypePayments | TypePayments[]
    message?: string
}

export async function readPayments(): Promise<TypePayments[]> {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM payments`;
        connection.query(query, (err, results) => {
            if (err) reject(err)
            else resolve(results as Array<TypePayments>)
        })
    })
}

export async function createPayment(payment: TypePayments): Promise<number> {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO payments (
            idinscription,
            payment,
            filepaymentlocation,
            state,
        ) VALUES (?,?,?,?);`;
        const values = [
            payment.idinscription,
            payment.payment,
            payment.filepaymentlocation,
            payment.state,
        ]
        connection.query(query, (err, results) => {
            const r: TypeQueryResult = results as TypeQueryResult
            if (err) reject(err)
            else resolve(r.insertId)
        })
    })
}

export async function updatePayment(payment: TypePayments, id: number): Promise<number> {
    return new Promise((resolve, reject) => {
        const query = `UPDATE payments SET 
            idinscription=${payment.idinscription},
            payment=${payment.payment},
            filepaymentlocation="${payment.filepaymentlocation}",
            state=${payment.state},
        WHERE idpayment=${id};`;
        connection.query(query, (err, results) => {
            const r: TypeQueryResult = results as TypeQueryResult
            if (err) reject(err)
            else resolve(r.affectedRows)
        })
    })
}

export async function deletePayment(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM payments WHERE idpayment=${id}`;
        connection.query(query, (err, results) => {
            const r: TypeQueryResult = results as TypeQueryResult
            if (err) reject(err)
            else resolve(r.affectedRows)
        })
    })
}