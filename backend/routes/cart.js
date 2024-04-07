import { isAuthenticated } from "../helpers/auth.js";
import { upsertProductToCart, getProductFromCart, getUserCart } from "../controllers/cart.js";

const cart = (router) => {
  // Add/Modifiy product to/in cart
  router.get("/cart/:userId", isAuthenticated(), getUserCart());
  router.get("/cart/:userId/product/:productId", isAuthenticated(), getProductFromCart());
  router.post("/cart", isAuthenticated(), upsertProductToCart());
}


export default cart;