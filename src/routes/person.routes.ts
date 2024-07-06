import express from "express";
import { PersonService } from "../services/person.service";
import { authValidation } from "../../utils/middleware";

const router = express.Router();
const personService = new PersonService();

router.get('/get', authValidation(2), async (req, res) => {
    const people = await personService.read();
    res.status(200).json(people);
})
router.get('/get/:id', authValidation(2), async (req, res) => {
    const person = await personService.getById(req.params.id);
    res.status(200).json(person);
})
router.post('/post', authValidation(2), async (req, res) => {
    const person = req.body
    const createdPerson = await personService.create(person);
    res.status(201).json(createdPerson);
})
router.delete('/delete/:id', authValidation(2), async (req, res) => {
    const deletedPerson = await personService.deleteById(req.params.id);
    res.status(200).json(deletedPerson);
})
router.put('/update/:id', authValidation(2), async (req, res) => {
    const updatedPerson = await personService.updateById(req.params.id, req.body);
    res.status(200).json(updatedPerson);
})

export default router