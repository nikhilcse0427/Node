let users = [];
let nextId = 1;

// Get all users
const getAllUsers = (req, res) => {
  res.json(users);
};

// Get a user by ID
const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

// Create a new user
const createUser = (req, res) => {
  const newUser = {
    id: nextId++,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update a user by ID
const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[userIndex] = { id: userId, ...req.body };
  res.json(users[userIndex]);
};

// Delete a user by ID
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  res.json({ message: `User with ID ${userId} deleted` });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
