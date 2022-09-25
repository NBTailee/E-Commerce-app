const router = require("express").Router();
const Cart = require("../models/cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// CREATE
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(404).json(err);
  }
});
// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json("Delete successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).json("cart not found");
  }
});
// GET ALL CART
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const allCart = await Cart.find({});
    res.status(200).json(allCart);
  } catch (err) {
    res.status(404).json("carts not found");
  }
});

module.exports = router;
