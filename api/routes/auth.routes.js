import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { registerUser, loginUser, checkLoggedIn, logout } from "../controllers/auth.controller.js";

const router = express.Router();
router.use(cookieParser())

router.use(
    cors({
        credentials: true,
        origin: "https://srihari-blogfrontend.onrender.com/",
        optionsSuccessStatus: 200,
    })
)

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", checkLoggedIn)
router.post("/logout", logout)


export default router
