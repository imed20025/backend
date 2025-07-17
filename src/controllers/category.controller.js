import Category from '../models/category.model.js'
import handleError from "../middlewares/errors/handleError.js";

const createCategory = async (req, res) => {
  try {
    // Check if an example with the same name already exists
    const existingCategory = await Category.findOne({ name: req.body.name });

    if (existingCategory) {
      return handleError(res, null, "User with this name already exists", 409); // 409 Conflict
    }

    const newCategory = new Category(req.body);
    await newCategory.save();
    return res.status(201).json(newCategory);
  } catch (error) {
    handleError(res, error, "Error in creating category", 500);
  }
};


const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return handleError(res, null, "No category found", 404); // 404 Not Found
    }

    return res.status(200).json(category);
  } catch (error) {
    handleError(res, error, "Error in getting one category", 500); // 500 server error
  }
};


const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (category.length === 0) {
      return res.status(204).send(); // No content
    }
    return res.status(200).json(category);
  } catch (error) {
    handleError(res, error, "Error in getting all category", 500);
  }
};


const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return handleError(res, null, "No data found", 404);
    }
    return res.status(200).json(category);
  } catch (error) {
    handleError(res, error, "Error in updating Category", 500);
  }
};


const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return handleError(res, null, "No category found", 404);
    }
    return res.status(200).json("category deleted");
  } catch (error) {
    handleError(res, error, "Error in deleting category", 500);
  }
};


const deleteProduct = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return handleError(res, null, "No User found", 404);
    }
    return res.status(200).json("User deleted");
  } catch (error) {
    handleError(res, error, "Error in deleting User", 500);
  }
};


const categoryController = {
  createCategory,
  getOneCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};

export default categoryController;
