import { Router } from "express";
import { handleSignup } from "../controller/signup.controller.js";
import { handleLogin } from "../controller/login.controller.js";

const router = Router();

router.post("/signup", handleSignup);
router.post("/login",handleLogin);

export default router;
