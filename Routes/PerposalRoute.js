import express from "express";
import Perposal from "../Controller/Perposal.js";
const router = express.Router();

router.post("/createProposal", Perposal.createPerposal);
router.post("/getMaidProposal", Perposal.getMaidperposal);
router.post("/getCustomerProposal", Perposal.getCustomerperposal);
router.post("/acceptProposal", Perposal.acceptPerposal);

router.post("/notification", Perposal.appNotification);

export default router;
