import express from "express"
import { DocumentService } from "../services/document.service"

const router = express.Router()
const documentService = new DocumentService()

router.get("/", async (req, res) => {
    const documents = await documentService.getAll()
    res.status(200).json(documents)
})

export default router