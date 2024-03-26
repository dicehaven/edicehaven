import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.js";

const product = (router) => {
  //Create single product
  router.post("/product", createProduct());

  //Update single product
  router.put("/product/:id", updateProduct());

  //Delege single product
  router.delete("/product/:id", deleteProduct());

  //get single product
  router.get("/product/:id", getProductById());

  //get all products
  router.get("/products", getProducts());

}




export default product;