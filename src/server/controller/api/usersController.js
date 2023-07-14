import User from "../../model/users.js";
import logging from "../../config/logging.js";
import config from "../../config/config.js";
import jwt from "jsonwebtoken";

const namespace = "User";

export const dataController = {
  async register(req, res, next) {
    try {
      res.locals.data = {};
      const user = await User.create(req.body);
      logging.info(user, namespace);
      const token = createJWT(user);
      res.locals.data.user = user;
      res.locals.data.token = token;
      next();
    } catch (error) {
      res.status(400).send("Error creating user");
      logging.error(error, namespace);
    }
  },

  async login(req, res, next) {
    try {
      res.locals.data = {};

      const { email, password } = req.body;

      //check if user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      //Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.locals.data.user = user;
      res.locals.data.token = createJWT(user);
      next();
    } catch (error) {
      logging.error(error, namespace);
      res.status(400).json({ error: "wrong credentials" });
    }
  },
};

export const apiController = {
  auth(req, res, next) {
    res.json(res.locals.data.token);
  },
};

/** Helper Function */

function createJWT(user) {
  return jwt.sign({ user }, config.secret, { expiresIn: "24h" });
}
