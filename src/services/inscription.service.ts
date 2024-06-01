import { TypeInscription } from "../../utils/types";
import { InscriptionResult, createInscription, deleteInscription, readInscriptions, updateInscription } from "../models/inscriptions.model";

export class InscriptionService {
    private readonly inscriptions: TypeInscription[]

    constructor() {
        this.inscriptions = []
    }

    async read(): Promise<InscriptionResult> {
        try {
            const inscriptions = await readInscriptions()
            return {
                success: true,
                data: inscriptions,
                message: "Inscripciones obtenidas correctamente"
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al obtener las inscripciones"
            }
        }
    }

    async create(inscription: TypeInscription): Promise<InscriptionResult> {
        try {
            const idInscriptionCreated = await createInscription(inscription)
            this.inscriptions.push({ ...inscription, idinscription: idInscriptionCreated })
            return {
                success: true,
                data: { ...inscription, idinscription: idInscriptionCreated },
                message: "Inscripcion creada correctamente"
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al crear la inscripcion"
            }
        }
    }

    async update(inscription: TypeInscription, idinscription: number): Promise<InscriptionResult> {
        try {
            const idInscriptionUpdated = await updateInscription(inscription, idinscription)
            if (!idInscriptionUpdated) return { success: false, message: "Error al actualizar la inscripcion" }
            const index = this.inscriptions.findIndex(i => i.idinscription === idinscription)
            if (index === -1) return { success: false, message: "Inscripcion no encontrada" }
            this.inscriptions[index] = { ...inscription, idinscription: idInscriptionUpdated }
            return {
                success: true,
                data: this.inscriptions[index],
                message: "Inscripcion actualizada correctamente"
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al actualizar la inscripcion"
            }
        }
    }

    async delete(idinscription: number): Promise<InscriptionResult> {
        try {
            const idInscriptionDeleted = await deleteInscription(idinscription)
            if (!idInscriptionDeleted) return { success: false, message: "Error al eliminar la inscripcion" }
            const index = this.inscriptions.findIndex(i => i.idinscription === idinscription)
            if (index === -1) return { success: false, message: "Inscripcion no encontrada" }
            this.inscriptions.splice(index, 1)
            return {
                success: true,
                message: "Inscripcion eliminada correctamente"
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al eliminar la inscripcion"
            }
        }
    }

}