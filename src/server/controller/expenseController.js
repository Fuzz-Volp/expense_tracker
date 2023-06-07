import Expense from "../model/expense.js";
import logging from "../config/logging.js";

const namespace = "Expense";

export const dataController = {
  async index(req, res, next) {
    try {
      const foundExp = await Expense.find({})
        .populate("category")
        .populate("payment")
        .exec();
      logging.info(foundExp, namespace);
      res.locals.data.exps = foundExp;
      next();
    } catch (error) {
      logging.error(error, namespace);
    }
  },
  async destroy(req, res, next) {
    try {
      const deletedExp = await Expense.findByIdAndDelete(req.params.id);
      logging.info(deletedExp, namespace);
      res.locals.data = {};
      res.locals.data.exp = deletedExp;
      next();
    } catch (error) {
      res.status(400).send("Cannot Find Expense");
      logging.error(error, namespace);
    }
  },
  async update(req, res, next) {
    try {
      const updateExp = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updateExp, namespace);
      res.locals.data.exp = updateExp;
      next();
    } catch (error) {
      res.status(400).send("Not able to update, try again");
      logging.error(error, namespace);
    }
  },
  async create(req, res, next) {
    try {
      const createExp = await Expense.create(req.body);
      logging.info(createExp, namespace);
      res.locals.data.exp = createExp;
      next();
    } catch (error) {
      res.status(400).send("Error creating category");
      logging.error(error, namespace);
    }
  },

  async show(req, res, next) {
    try {
      const foundExp = await Expense.findById(req.params.id);
      logging.info(foundExp, namespace);
      res.locals.data.exp = foundExp;
      next();
    } catch (error) {
      res.status(404).send("Expense not Found");
      logging.error(error, namespace);
    }
  },
};

export const apiController = {
  index(req, res, next) {
    res.json(res.locals.data.exps);
  },
  show(req, res, next) {
    res.json(res.locals.data.exp);
  },
};
