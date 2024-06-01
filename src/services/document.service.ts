import { TypeDocumentType } from "../../utils/types";
import { DocumentResult, getDocuments } from "../models/document.model";



export class DocumentService {
    private readonly document: TypeDocumentType[];

    constructor() {
        this.document = []
    }

    async getAll(): Promise<DocumentResult> {
        try {
            const documents = await getDocuments()
            return {
                success: true,
                message: "Documentos obtenidos correctamente",
                data: documents
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                message: "Error al obtener documentos"
            }
        }
    }
}