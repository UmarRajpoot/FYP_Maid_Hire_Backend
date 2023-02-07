import express from "express";
import AuthProfile from "../Controller/AuthProfile.js";
const router = express.Router();

router.post("/addProfile", AuthProfile.addProfile);
router.post("/updateProfile", AuthProfile.updateProfile);
router.delete("/deleteProfile", AuthProfile.deleteProfile);

export default router;
