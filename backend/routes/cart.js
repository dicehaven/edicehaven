import { upsertProductToCart, getProductFromCart, getUserCart } from "../controllers/cart.js";

const cart = (router) => {
  // Add/Modifiy product to/in cart
  router.get("/cart/:userId", getUserCart());
  router.get("/cart/:userId/product/:productId", getProductFromCart());
  router.post("/cart", upsertProductToCart());
}


export default cart;