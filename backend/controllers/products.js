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
  const { searchValue, qCategory, sortBy, sortOrder } = req.query;
  try {
    let queryObject = {};
    if (searchValue) {
      // Case insensitive search by name
      queryObject.name = { $regex: searchValue, $options: 'i' };
    }

    if (qCategory) {
      queryObject.category = { $in: [qCategory] };
    }

    // Sorting logic
    let sortObject = { countInStock: -1, name: 1 }; // Default sorting by available and name
    if (sortBy) {
      const order = sortOrder === 'desc' ? -1 : 1; 
      sortObject = { [sortBy]: order };
      if (sortBy !== 'name') sortObject.name = 1;
    }

    const products = await ProductModel.find(queryObject).sort(sortObject);

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
