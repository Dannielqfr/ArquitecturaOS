import express from "express"

import { WorkshopService } from "../services/workshop.service"
import { authValidation } from "../../utils/middleware"

const router = express.Router()
const workshopService = new WorkshopService()

router.get("/get", authValidation(2), async (req, res) => {
    const workshops = await workshopService.read()
    res.status(200).json(workshops)
})

router.post("/post", authValidation(2), async (req, res) => {
    const workshop = await workshopService.create(req.body)
    res.status(201).json(workshop)
})

router.put("/put/:id", authValidation(2), async (req, res) => {
    const workshop = await workshopService.update(req.body, +req.params.id)
    res.status(202).json(workshop)
})

router.delete("/delete/:id", authValidation(2), async (req, res) => {
    const result = await workshopService.delete(+req.params.id)
    res.status(202).json(result)
})

export default router