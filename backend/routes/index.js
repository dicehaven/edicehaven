import express from 'express';
import products from "../data/products.js"
import UserModel from "../models/user.js"

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is running...");
});

// Get request for all products
router.get("/products", (req, res) => {
  res.json(products);
});

//Get request for single product
router.get("/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

//Get request for single product
router.post("/register", async (req, res) => {
  try {
    let newUser = new UserModel(req.body);

    let result = await UserModel.create(newUser);
    res.json(
      {
        success: true,
        message: "User created successfully.",
        result
      }
    );
  } catch (error) {
    console.log(error);
    next(error)
  }
});

router.post("/login", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

export default router;
