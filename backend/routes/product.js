import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.js";

const product = (router) => {
  //Create single product
  router.post("/", createProduct());

  //Update single product
  router.put("/:id", updateProduct());

  //Delege single product
  router.delete("/:id", deleteProduct());

  //get single product
  router.get("/:id", getProductById());

  //get all products
  router.get("/", getProducts());

}




export default product;