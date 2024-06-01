import express from "express";
import { InscriptionService } from "../services/inscription.service";


const router = express.Router();
const inscriptionService = new InscriptionService();

router.get("/get", async (req, res) => {
    const result = await inscriptionService.read();
    res.status(200).json(result);
});

router.post("/post", async (req, res) => {
    const result = await inscriptionService.create(req.body);
    res.status(201).json(result);
});

router.put("/put/:id", async (req, res) => {
    const result = await inscriptionService.update(req.body, +req.params.id);
    res.status(202).json(result);
});

router.delete("/delete/:id", async (req, res) => {
    const result = await inscriptionService.delete(+req.params.id);
    res.status(202).json(result);
});

export default router;