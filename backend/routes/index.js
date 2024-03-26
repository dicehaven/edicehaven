import express from 'express';
import auth from './auth.js'
import user from './user.js'
import product from './product.js'

export const routes = () => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("API is running...");
  });
  
  auth(router);
  user(router);
  product(router)

  return router;
};


// // Get request for all products
// router.get("/products", (req, res) => {
//   res.json(products);
// });

// //Get request for single product
// router.get("/products/:id", (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);
//   res.json(product);
// });


export default routes;
