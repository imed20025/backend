import Product from '../models/product.model.js'
import handleError from "../middlewares/errors/handleError.js";

const createProduct = async (req, res) => {
  try {
    // Check if an example with the same name already exists
    const existingProduct = await Product.findOne({ name: req.body.name });

    if (existingProduct) {
      return handleError(res, null, "Product with this name already exists", 409); // 409 Conflict
    }

    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    handleError(res, error, "Error in creating product", 500);
  }
};

const getOneProduct = async (req, res) => {
  try {
    
    const product = await Product.findById(req.params.id);

    if (!product) {
      return handleError(res, null, "No Product found", 404); // 404 Not Found
    }

    return res.status(200).json(product);
  } catch (error) {
    handleError(res, error, "Error in getting one Product", 500); // 500 server error
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    console.log("Product backend ", products)
    return res.status(200).json(products);
  } catch (error) {
    handleError(res, error, "Error in getting all product", 500);
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return handleError(res, null, "No data found", 404);
    }
    return res.status(200).json(product);
  } catch (error) {
    handleError(res, error, "Error in updating Product", 500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return handleError(res, null, "No Product found", 404);
    }
    return res.status(200).json("Product deleted");
  } catch (error) {
    handleError(res, error, "Error in deleting Product", 500);
  }
};

const productController = {
  createProduct,
  getOneProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};

export default productController;
