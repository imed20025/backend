// Import model
import User from "../models/user.model.js";
import handleError from "../middlewares/errors/handleError.js";

const createUser = async (req, res) => {
  try {
    // Check if an example with the same name already exists
    const existingUser = await User.findOne({ name: req.body.name });

    if (existingUser) {
      return handleError(res, null, "User with this name already exists", 409); // 409 Conflict
    }
    const existingUserWithEmail = await User.findOne({ email: req.body.email });
    if (existingUserWithEmail) {
      return handleError(res, null, "User with this email already exists", 409); // 409 Conflict
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    handleError(res, error, "Error in creating user", 500);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return handleError(res, null, "No User found", 404); // 404 Not Found
    }

    return res.status(200).json(user);
  } catch (error) {
    handleError(res, error, "Error in getting one User", 500); // 500 server error
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(204).send(); // No content
    }
    return res.status(200).json(users);
  } catch (error) {
    handleError(res, error, "Error in getting all users", 500);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return handleError(res, null, "No data found", 404);
    }
    return res.status(200).json(user);
  } catch (error) {
    handleError(res, error, "Error in updating User", 500);
  }
};

const deleteUser = async (req, res) => {
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

const userController = {
  createUser,
  getOneUser,
  getAllUser,
  updateUser,
  deleteUser,
};

export default userController;
