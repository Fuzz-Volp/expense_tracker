import Category from "../model/category";
import logging from "../config/logging";

const namespace = "Category";

const dataController = {
  async index(req, res, next) {
    try {
      const foundCats = await Category.find({});
      logging.info(foundCats, namespace);
      res.locals.data.cats = foundCats;
      next();
    } catch (error) {
      logging.error(error, namespace);
    }
  },
  async destroy(req, res, next) {
    try {
      const deletedCat = await Category.findByIdAndDelete(req.params.id);
      logging.info(deletedCat, namespace);
      res.locals.data = {};
      res.locals.data.cat = deletedCat;
      next();
    } catch (error) {
      res.status(400).send("Cannot Find Category");
      logging.error(error, namespace);
    }
  },
  async update(req, res, next) {
    try {
      const updateCat = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      logging.info(updateCat, namespace);
      res.locals.data.cat = updateCat;
      next();
    } catch (error) {
      res.status(400).send("Not able to update, try again");
      logging.error(error, namespace);
    }
  },
  async create(req, res, next) {
    try {
      const createCat = await Category.create(req.body);
      logging.info(createCat, namespace);
      res.locals.data.category = createCat;
      next();
    } catch (error) {
      res.status(400).send("Error creating category"),
        logging.error(error, namespace);
    }
  },
  async show(req, res, next) {
    try {
      const foundCat = await Category.findById(req.params.id);
      logging.info(foundCat, namespace);
      res.locals.data.category = foundCat;
      next();
    } catch (error) {
      res.status(404).send("Category not Found");
      logging.error(error, namespace);
    }
  },
};

const apiController = {
  index(req, res, next) {
    res.json(res.locals.data.categories);
  },
  show(req, res, next) {
    res.json(res.locals.data.category);
  },
};
