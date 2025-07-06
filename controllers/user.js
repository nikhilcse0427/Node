const UserModel = require('../models/user.model'); // Import the Mongoose model

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(); // Fetch all users from the database
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, job_title } = req.body;
    if (!first_name || !last_name || !email || !gender || !job_title) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newUser = new UserModel({ first_name, last_name, email, gender, job_title });
    await newUser.save(); // Save the new user to the database
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id); // Delete user by ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: `User with ID ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};