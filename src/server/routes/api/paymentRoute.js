import express from "express";
import logging from "../../config/logging.js";
import {
  dataController,
  apiController,
} from "../../controller/api/paymentController.js";

const namespace = "Route";
const router = express.Router();

// Middleware to initialize res.locals.data
router.use((req, res, next) => {
  res.locals.data = {};
  next();
});

// Index: GET
router.get("/", dataController.index, apiController.index);

// Delete: DELETE
router.delete("/:id", dataController.destroy, apiController.show);

// Update: PUT
router.put("/:id", dataController.update, apiController.show);

// Create: POST
router.post("/", dataController.create, apiController.show);

// Show: GET
router.get("/:id", dataController.show, apiController.show);

// Error handling middleware
router.use((error, req, res, next) => {
  logging.error(error, namespace); // Log the error for debugging purposes
  res.status(500).send("Internal Server Error");
});

export default router;
