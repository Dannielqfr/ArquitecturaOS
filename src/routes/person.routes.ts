import express from "express";
import { PersonService } from "../services/person.service";

const router = express.Router();
const personService = new PersonService();

router.get('/', (req, res) => {
    res.status(200);
})
router.post('/create', async(req, res) => {
    const person = req.body
    const createdPerson = await personService.create(person);
    res.status(201).json(createdPerson);
})

export default router