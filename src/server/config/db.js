import { connect } from "mongoose";
import config from "./config";

const namespace = "Mongoose";

export const connectDB = async () => {
  await connect(config.mongo.uri, config.mongo.options)
    .then(() => {
      logging.info("mongoose is connect", namespace);
    })
    .catch((error) => {
      logging.error(error, namespace);
    });
};
