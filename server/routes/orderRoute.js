import express from "express";
import { getOrder, order } from "../controllers/orderController.js";

const router = express.Router();

router.post("/sendorder", order);
router.get("/getrouter/:userId", getOrder);

export default router;
