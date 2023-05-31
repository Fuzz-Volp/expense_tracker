import mongoose from "mongoose";
import config from "./config.js";
import logging from "./logging.js";

const { connect, connection } = mongoose;

const namespace = "Mongoose";
const db = connection;

const connectDB = async () => {
  await connect(config.mongo.uri, config.mongo.options)
    .then(() => {
      logging.info(
        `Mongoose is connected to ${db.name} at ${db.host}`,
        namespace
      );
    })
    .catch((error) => {
      logging.error(error, namespace);
    });
};

export default connectDB;
