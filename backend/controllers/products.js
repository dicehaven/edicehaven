import ProductModel from "../models/product.js"

const createProduct = () => async (req, res) => {
  const newProduct = new ProductModel(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateProduct = () => async (req, res) => {
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
}

const deleteProduct = () => async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
}

const getProducts = () => async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await ProductModel.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await ProductModel.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await ProductModel.find();
    }

    res.status(200).json({ products, success: true });
  } catch (err) {
    res.status(500).json(err);
  }
}

const getProductById = () => async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}

export { createProduct, updateProduct, deleteProduct, getProducts, getProductById }
