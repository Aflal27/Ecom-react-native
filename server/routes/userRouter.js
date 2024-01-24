import express from "express";
import {
  createAddress,
  getAddress,
  getUser,
  userLogin,
  userRegister,
  verifideEmail,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userRegister);
router.get("/verify/:token", verifideEmail);
router.post("/login", userLogin);
router.post("/address", createAddress);
router.get("/address/:userId", getAddress);
router.get("/getuser/:userId", getUser);
export default router;
