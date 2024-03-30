import CartModel from "../models/cart.js"

const addProductToCart = () => async (req, res) => {

  // check if user has a Cart. If not, create a cart and then add the product
  const update = {
    $push: { items: { product: req.body.productId, quantity: req.body.quantity, price: req.body.price } },
    $setOnInsert: { user: req.body.userId } // Set the user field only on insert
  };

  const options = {
    new: true, // Return the modified document
    upsert: true, // Make this update an upsert
    setDefaultsOnInsert: true // Apply default schema values on insert
  };

  try {
    await CartModel.findOneAndUpdate({ user: req.body.userId }, update, options);

    return res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }


}

const modifyProductsInCart = () => async (req, res) => {

}

const clearAllCartFromUser = () => async (req, res) => {

}

const payCartItems = () => async (req, res) => {

}




export { addProductToCart, modifyProductsInCart, clearAllCartFromUser, payCartItems }
