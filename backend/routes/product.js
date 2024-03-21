import ProductModel from "../models/product.js"
import express from 'express';
const router = express.Router();

  
  
  //Create single product
  router.post("/", async(req,res)=>{
    const newProduct = new ProductModel(req.body);
    try{
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    }catch (err){
      res.status(500).json(err);
    }
  });
  
  //Update single product
  router.put("/:id", async(req,res)=>{
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //Delege single product
  router.delete("/:id",  async (req, res) => {
    try {
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  export default router;