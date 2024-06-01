import { TypePayments } from "../../utils/types"
import { PaymentResult, createPayment, deletePayment, readPayments, updatePayment } from "../models/payments.model"

export class PaymentService {
    private readonly payments: TypePayments[]

    constructor() {
        this.payments = []
    }

    async read(): Promise<PaymentResult> {
        try {
            const payments = await readPayments()
            return {
                success: true,
                data: payments,
                message: "Pagos obtenidos correctamente"
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al obtener los pagos"
            }
        }
    }

    async create(payment: TypePayments): Promise<PaymentResult> {
        try {
            const idPaymentCreated = await createPayment(payment)
            if (!idPaymentCreated) return { success: false, message: "Error al crear el pago" }
            this.payments.push(payment)
            return {
                success: true,
                data: { ...payment, idpayment: idPaymentCreated },
                message: "Pago creado correctamente"
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al crear el pago"
            }
        }
    }

    async update(payment: TypePayments, idpayment: number): Promise<PaymentResult> {
        try {
            const idPaymentUpdated = await updatePayment(payment, idpayment)
            if (!idPaymentUpdated) return { success: false, message: "Error al actualizar el pago" }
            return {
                success: true,
                data: payment,
                message: "Pago actualizado correctamente"
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al actualizar el pago"
            }
        }
    }

    async delete(idpayment: number): Promise<PaymentResult> {
        try {
            const paymentDeleted = await deletePayment(idpayment)
            if (!paymentDeleted) return { success: false, message: "Error al eliminar el pago" }
            return {
                success: true,
                message: "Pago eliminado correctamente"
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al eliminar el pago"
            }
        }
    }
}

