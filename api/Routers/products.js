const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../model/product");
const tokenCheck = require("../middlewire/tokenCheck");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", tokenCheck, (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then(result => {
      res.status(200).json({
        response: result,
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:userId", (req, res, next) => {
  const Id = req.params.userId;

  Product.findById(Id)
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
