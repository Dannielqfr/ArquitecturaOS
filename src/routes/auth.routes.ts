import express from "express";
import AuthService from "../services/auth.service";


const router = express.Router();
const authService = new AuthService()

router.post('/login', async (req, res) => {
    console.log("login route");
    const loginResult = await authService.login(req.body);
    console.log("login result", loginResult);
    res.status(201).json(loginResult);
})

export default router