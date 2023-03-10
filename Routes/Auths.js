import express from "express";
import Auth from "../Controller/Auths.js";
const router = express.Router();

router.post("/register", Auth.Register);
router.post("/login", Auth.Login);
router.post("/maidIdUpdate", Auth.updateMaidID);
router.post("/profileIdUpdate", Auth.updateProfileID);
router.post("/changePasswrod", Auth.ChangePassword);

export default router;
