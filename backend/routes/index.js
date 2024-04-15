import express from 'express';
import auth from './auth.js'
import user from './user.js'
import product from './product.js'
import cart from './cart.js'
import orders from './order.js'

export const routes = () => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("API is running...");
  });
  
  // Joins all routes under a a single file
  auth(router);
  user(router);
  product(router);
  cart(router);
  orders(router);

  return router;
};

export default routes;
