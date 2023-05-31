import express from "express";
import ViteExpress from "vite-express";
import config from "./config/config.js";
import logging from "./config/logging.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "The API is alive!!" });
});

ViteExpress.listen(app, 3001, () =>
  logging.info(
    `Server is running at ${config.server.host}:${config.server.port} ...`
  )
);
