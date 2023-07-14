import express from "express";
import {
  dataController,
  apiController,
} from "../../controller/api/usersController.js";

const router = express.Router();

//Login: POST /api/users/login
router.post("/login", dataController.login, apiController.auth);

//Register: POST /api/users
router.post("/", dataController.register, apiController.auth);

export default router;
