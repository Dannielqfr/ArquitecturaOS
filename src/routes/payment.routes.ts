import express from "express";
import { PaymentService } from "../services/payment.service";


const router = express.Router();
const paymentService = new PaymentService();

router.post('/post', async (req, res) => {
    const result = await paymentService.create(req.body);
    res.status(201).json(result);
})

router.get('/get', async (req, res) => {
    const result = await paymentService.read();
    res.status(200).json(result);
})

router.delete('/delete/:id', async (req, res) => {
    const result = await paymentService.delete(+req.params.id);
    res.status(202).json(result);
})

router.put('/put/:id', async (req, res) => {
    const result = await paymentService.update(req.body, +req.params.id);
    res.status(202).json(result);
})

export default router