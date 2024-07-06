import express from "express";
import { PaymentService } from "../services/payment.service";
import { authValidation } from "../../utils/middleware";


const router = express.Router();
const paymentService = new PaymentService();

router.post('/post', authValidation(2), async (req, res) => {
    const result = await paymentService.create(req.body);
    res.status(201).json(result);
})

router.get('/get', authValidation(2), async (req, res) => {
    const result = await paymentService.read();
    res.status(200).json(result);
})

router.delete('/delete/:id', authValidation(2), async (req, res) => {
    const result = await paymentService.delete(+req.params.id);
    res.status(202).json(result);
})

router.put('/put/:id', authValidation(2), async (req, res) => {
    const result = await paymentService.update(req.body, +req.params.id);
    res.status(202).json(result);
})

export default router