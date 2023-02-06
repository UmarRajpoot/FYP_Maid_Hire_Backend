import express from "express";
import Auth from "../Controller/Auths.js";
const router = express.Router();

router.post("/register", Auth.Register);
router.post("/login", Auth.Login);
router.post("/authUpdate", Auth.updateMaidID);
router.post("/changePasswrod", Auth.ChangePassword);

export default router;
