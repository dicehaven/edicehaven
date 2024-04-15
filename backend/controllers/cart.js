import CartModel from "../models/cart.js"

const getUserCart = () => async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await CartModel.find({ user: { _id: userId } }).populate('items.product');;
    return res.status(200).json({
      success: true,
      message: "User cart retrieved successfully",
      cart
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}

const getProductFromCart = () => async (req, res) => {
  const { productId, userId } = req.params;

  try {
    // Find the cart with the specified userId
    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the given user"
      });
    }

    // Find the product within the cart items
    const productInCart = cart.items.find(item => item.product.toString() === productId);

    if (!productInCart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the user's cart"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product found in the user's cart",
      product: productInCart
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const upsertProductToCart = () => async (req, res) => {
  const { userId, productId, quantity, price } = req.body;

  try {
    // Fetch the user's cart
    let cart = await CartModel.findOne({ user: userId });

    if (cart) {
      // Find the index of the product in the cart if it exists
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity or remove it based on the quantity
        if (quantity > 0) {
          cart.items[itemIndex].quantity = quantity;  // Update the quantity
          cart.items[itemIndex].price = price;        // Update the price if needed
        } else {
          cart.items.splice(itemIndex, 1);  // Remove the item if quantity is 0 or less
        }
      } else if (quantity > 0) {
        // Product does not exist in the cart, add new item
        cart.items.push({ product: productId, quantity, price });
      }

      // Save the updated cart
      await cart.save();
    } else if (quantity > 0) {
      // No cart exists for the user, create a new cart with the product
      cart = await CartModel.create({
        user: userId,
        items: [{ product: productId, quantity, price }]
      });
    }

    return res.status(201).json({
      success: true,
      message: "Cart updated successfully",
      cart
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export {
  getUserCart,
  getProductFromCart,
  upsertProductToCart,
}
