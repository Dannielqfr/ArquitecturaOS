import express from "express"

import { WorkshopService } from "../services/workshop.service"

const router = express.Router()
const workshopService = new WorkshopService()

router.get("/get", async (req, res) => {
    const workshops = await workshopService.read()
    res.status(200).json(workshops)
})

router.post("/post", async (req, res) => {
    const workshop = await workshopService.create(req.body)
    res.status(201).json(workshop)
})

router.put("/put/:id", async (req, res) => {
    const workshop = await workshopService.update(req.body, +req.params.id)
    res.status(202).json(workshop)
})

router.delete("/delete/:id", async (req, res) => {
    const result = await workshopService.delete(+req.params.id)
    res.status(202).json(result)
})

export default router