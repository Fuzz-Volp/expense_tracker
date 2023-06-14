import User from "../../model/users";
import logging from "../../config/logging";
import config from "../../config/config";

const namespace = "User";

export const dataController = {
  async index(req, res, next) {
    try {
      const foundUsers = await User.find({});
      logging.info(foundUsers, namespace);
      res.locals.data.users = foundUsers;
      next();
    } catch (error) {
      logging.error(error, namespace);
    }
  },
  async destroy(req, res, next) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      logging.info(deletedUser, namespace);
      res.locals.data = {};
      res.locals.data.user = deletedUser;
      next();
    } catch (error) {
      res.status(400).send("Cannot Find User");
      logging.error(error, namespace);
    }
  },
  async update(req, res, next) {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      logging.info(updateUser, namespace);
      res.locals.data.user = updateUser;
      next();
    } catch (error) {
      res.status(400).send("Not able to update, try again");
      logging.error(error, namespace);
    }
  },
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      // check if user is already registerd
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already exsists" });
      }

      //Hash the password
      const salt = config.bcrypt.salt;
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new User
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      logging.info(newUser, namespace);

      // Save User
      const savedUser = await newUser.save();

      // Gen JWT
      const token = jwt.sign({ userID: savedUser._id }, config.secret);

      // Return Token To Client
      res.json({ token });

      next();
    } catch (error) {
      res.status(400).send("Error creating user");
      logging.error(error, namespace);
    }
  },

  async login(req, res, next) {
    try {
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

      //Gen JWT
      const token = jwt.sign({ userId: user._id }, config.secret);
      // return token to client
      res.json({ token });
      next();
    } catch (error) {
      logging.error(error, namespace);
      res.status(400).json({ error: "wrong credentials" });
    }
  },

  async show(req, res, next) {
    try {
      const foundUser = await User.findById(req.params.id);
      logging.info(foundUser, namespace);
      res.locals.data.user = foundUser;
      next();
    } catch (error) {
      res.status(404).send("User not Found");
      logging.error(error, namespace);
    }
  },
};

export const apiController = {
  index(req, res, next) {
    res.json(res.locals.data.users);
  },
  show(req, res, next) {
    res.json(res.locals.data.user);
  },
};
