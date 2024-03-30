import { addProductToCart } from "../controllers/cart.js";

const product = (router) => {
  // Add product to cart
  router.post("/cart", addProductToCart());

}


export default product;