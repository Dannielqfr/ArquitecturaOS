import express from "express";
import { InscriptionService } from "../services/inscription.service";
import { authValidation } from "../../utils/middleware";


const router = express.Router();
const inscriptionService = new InscriptionService();

router.get("/get", authValidation(2), async (req, res) => {
    const result = await inscriptionService.read();
    res.status(200).json(result);
});

router.post("/post", async (req, res) => {
    console.log("inscription/post")
    const result = await inscriptionService.create(req.body);
    res.status(201).json(result);
});

router.put("/put/:id", authValidation(2), async (req, res) => {
    console.log("inscription/put")
    const result = await inscriptionService.update(req.body, +req.params.id);
    res.status(202).json(result);
});

router.delete("/delete/:id", authValidation(2), async (req, res) => {
    const result = await inscriptionService.delete(+req.params.id);
    res.status(202).json(result);
});

export default router;