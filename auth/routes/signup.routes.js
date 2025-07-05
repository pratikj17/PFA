import { Router } from "express";
import { handleSignup } from "../controller/signup.controller.js";

const router = Router();

router.post("/signup", handleSignup);

export default router;
