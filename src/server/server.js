import express from "express";
import ViteExpress from "vite-express";
import config from "./config/config.js";
import logging from "./config/logging.js";
import connectDB from "./config/db.js";
import categoryRoute from "./routes/api/categoryRoute.js";
import paymentRoute from "./routes/api/paymentRoute.js";
import expenseRoute from "./routes/api/expenseRoute.js";

connectDB();

const app = express();

app.use(express.json());

/**Routes */
app.use("/api/category", categoryRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/expense", expenseRoute);

// API Check
app.get("/api", (req, res) => {
  res.json({ message: "The API is alive!!" });
});

ViteExpress.listen(app, 3001, () =>
  logging.info(
    `Server is running at ${config.server.host}:${config.server.port} ...`
  )
);
