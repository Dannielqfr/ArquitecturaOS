import express from "express";
import { PersonService } from "../services/person.service";

const router = express.Router();
const personService = new PersonService();

router.get('/get', async (req, res) => {
    console.log("consultado")
    const people = await personService.read();
    res.status(200).json(people);
})
router.get('/get/:id', async (req, res) => {
    const person = await personService.getById(req.params.id);
    res.status(200).json(person);
})
router.post('/post', async (req, res) => {
    const person = req.body
    const createdPerson = await personService.create(person);
    res.status(201).json(createdPerson);
})
router.delete('/delete/:id', async (req, res) => {
    const deletedPerson = await personService.deleteById(req.params.id);
    res.status(200).json(deletedPerson);
})
router.put('/update/:id', async (req, res) => {
    const updatedPerson = await personService.updateById(req.params.id, req.body);
    res.status(200).json(updatedPerson);
})

export default router