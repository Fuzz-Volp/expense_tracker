import Payement from "../model/payment.js";
import logging from "../config/logging.js";

const namespace = "Payment";

export const dataController = {
  async index(req, res, next) {
    try {
      const foundPays = await Payement.find({});
      logging.info(foundPays, namespace);
      res.locals.data.pays = foundPays;
      next();
    } catch (error) {
      logging.error(error, namespace);
    }
  },
  async destroy(req, res, next) {
    try {
      const deletedPay = await Payement.findByIdAndDelete(req.params.id);
      logging.info(deletedPay, namespace);
      res.locals.data = {};
      res.locals.data.pay = deletedPay;
      next();
    } catch (error) {
      res.status(400).send("Cannot Find Payement");
      logging.error(error, namespace);
    }
  },
  async update(req, res, next) {
    try {
      const updatePay = await Payement.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updatePay, namespace);
      res.locals.data.pay = updatePay;
      next();
    } catch (error) {
      res.status(400).send("Not able to update, try again");
      logging.error(error, namespace);
    }
  },
  async create(req, res, next) {
    try {
      const createPay = await Payement.create({ name: req.body.name });
      logging.info(createPay, namespace);
      res.locals.data.pay = createPay;
      next();
    } catch (error) {
      res.status(400).send("Error creating Payement");
      logging.error(error, namespace);
    }
  },

  async show(req, res, next) {
    try {
      const foundPay = await Payement.findById(req.params.id);
      logging.info(foundPay, namespace);
      res.locals.data.pay = foundPay;
      next();
    } catch (error) {
      res.status(404).send("Payement not Found");
      logging.error(error, namespace);
    }
  },
};

export const apiController = {
  index(req, res, next) {
    res.json(res.locals.data.pays);
  },
  show(req, res, next) {
    res.json(res.locals.data.pay);
  },
};
