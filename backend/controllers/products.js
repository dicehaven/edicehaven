import ProductModel from "../models/product.js"

const createProduct = () => async (req, res) => {
  console.log('req.body', req.body)
  const newProduct = new ProductModel(req.body);
  try {
    const savedProduct = await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      savedProduct
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

const updateProduct = () => async (req, res) => {
  console.log('firsreq.params.idt', req.params.id)
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct
    });
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({
      success: true,
      message: err.message
    });
  }
}

const deleteProduct = () => async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Product has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
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

    return res.status(200).json({ products, success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
}

const getProductById = () => async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product found successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      product,
    });
  }
}

export { createProduct, updateProduct, deleteProduct, getProducts, getProductById }
