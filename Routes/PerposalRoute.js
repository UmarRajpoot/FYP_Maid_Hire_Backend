import express from "express";
import Perposal from "../Controller/Perposal.js";
const router = express.Router();

router.post("/createProposal", Perposal.createPerposal);
router.post("/getProposal", Perposal.getperposal);
router.post("/acceptProposal", Perposal.acceptPerposal);

export default router;
