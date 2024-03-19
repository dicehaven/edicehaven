import express from 'express';
import products from "../data/products.js"
import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'
import config from '../config/config.js';

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
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log('req.oyd', req.body);
    let user = await UserModel.findOne({ "userName": req.body.userName })
    if (!user)
        throw new Error('User not found');
        console.log('req.jasdfasdf', user);
    if (!user.authenticate(req.body.password))
        throw new Error("Email and/or password don't match.");
        console.log('2.1351');
    // Issue the token
    let payload = {
        id: user._id,
        username: user.username
    }

    let token = jwt.sign(payload, config.SECRETKEY,
        {
            algorithm: 'HS512',
            expiresIn: "20min"
        });

    // Send the token to the client
    return res.json(
        {
            success: true,
            token: token
        }
    );

} catch (error) {
    console.log(error);
}
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  try {
    await UserModel.updateOne({ _id: id}, {
      ...req.body
    })

    return res.json(
        {
            success: true,
            message: "User updated successfully"
        }
    );

} catch (error) {
    console.log(error);
}
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  try {
    await UserModel.deleteOne({ _id: id})

    return res.json(
        {
            success: true,
            message: "User deleted successfully"
        }
    );

} catch (error) {
    console.log(error);
}
});

export default router;
