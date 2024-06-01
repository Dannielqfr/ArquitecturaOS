import { TypeWorkshop } from "../../utils/types";
import { WorkshopResult, createWorkshop, deleteWorkshop, readWorkshops, updateWorkshop } from "../models/workshop.model";

export class WorkshopService {
    private readonly workshops: TypeWorkshop[];

    constructor() {
        this.workshops = []
    }

    async read(): Promise<WorkshopResult> {
        try {
            const workshops = await readWorkshops()
            return {
                success: true,
                data: workshops,
                message: "Talleres obtenidos correctamente"
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al obtener los talleres"
            }
        }
    }

    async create(workshop: TypeWorkshop): Promise<WorkshopResult> {
        try {
            const idWorkshopCreated = await createWorkshop(workshop)
            this.workshops.push(workshop);
            return {
                success: true,
                message: "Taller creado correctamente",
                data: { ...workshop, idworkshop: idWorkshopCreated }
            }
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error al crear el taller" };
        }
    }

    async update(workshop: TypeWorkshop, id: number): Promise<WorkshopResult> {
        try {
            const affectedRows = await updateWorkshop(workshop, id)
            if (affectedRows === 0) return { success: false, message: "Taller no encontrado" }
            const index = this.workshops.findIndex((workshop) => workshop.idworkshop === id);
            if (index === -1) return { success: false, message: "Taller no encontrado" };
            this.workshops[index] = workshop;
            return { success: true, message: "Taller actualizado correctamente" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error al actualizar el taller" };
        }
    }

    async delete(id: number): Promise<WorkshopResult> {
        try {
            const affectedRows = await deleteWorkshop(id)
            if (affectedRows === 0) return { success: false, message: "Taller no encontrado" }
            const index = this.workshops.findIndex((workshop) => workshop.idworkshop === id);
            if (index === -1) return { success: false, message: "Taller no encontrado" };
            this.workshops.splice(index, 1);
            return { success: true, message: "Taller eliminado correctamente" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error al eliminar el taller" };
        }
    }

}