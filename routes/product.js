const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(404).json(err);
  }
});
// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET PRODUCT
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json("product not found");
  }
});
// GET ALL PRODUCT
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const { sNew, category } = req.query;
  try {
    if (sNew) {
      const products = await Product.find({}).sort({ _id: -1 }).limit(5); // get 5 newest products
      return res.status(200).json(products);
    } else if (category) {
      const products = await Product.find({
        category: {
          $in: [category],
        },
      });
      return res.status(200).json(products);
    } else {
      const products = await Product.find({});
      return res.status(200).json(products);
    }
  } catch (err) {
    res.status(404).json("products not found");
  }
});

module.exports = router;
