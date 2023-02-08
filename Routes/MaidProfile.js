import express from "express";
import MaidProfile from "../Controller/MaidProfile.js";

const router = express.Router();

router.post("/createProfile", MaidProfile.createProfile);
router.post("/getProfile", MaidProfile.get_maid_profile);
router.get("/getallProfile", MaidProfile.get_all_profile);
router.post("/updateProfile", MaidProfile.updateProfile);
router.post("/updateProfilePhoto", MaidProfile.profile_photo);
router.post("/deleteProfile", MaidProfile.deleteProfile);

export default router;
