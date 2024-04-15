import { isAuthenticated } from "../helpers/auth.js";
import { upsertProductToCart, getProductFromCart, getUserCart } from "../controllers/cart.js";

const cart = (router) => {
  // get the actual cart of the user
  router.get("/cart/:userId", isAuthenticated(), getUserCart());

  // get one product of the cart of th user. Used to see the quantity in it
  router.get("/cart/:userId/product/:productId", isAuthenticated(), getProductFromCart());

  // changes to the cart
  router.post("/cart", isAuthenticated(), upsertProductToCart());
}


export default cart;