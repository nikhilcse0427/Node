const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const mongoose = require('mongoose');
const UserModel = require('./models/user.model.js');

mongoose.connect('mongodb+srv://nikhilverma0427:3Uc7TscofacwjURU@cluster0.i55xgqv.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Middleware1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware2");
  next();
})

// Helper function to save users to file
const saveUsersToFile = (users) => {
  fs.writeFileSync(path.join(__dirname, "Mock_Data.json"), JSON.stringify(users, null, 2));
};

// Load users from JSON file
let users = [];
try {
  users = JSON.parse(fs.readFileSync(path.join(__dirname, "Mock_Data.json")));
} catch (err) {
  console.error("Error reading Mock_Data.json:", err.message);
}

app.get("/", (req, res) => {
  res.send(`
    <form action="/search" method="get">
      <input type="text" name="name" placeholder="name" />
      <input type="text" name="job" placeholder="job" />
      <button type="submit">Search</button>
    </form>
  `);
});

app.get("/search", (req, res) => {
  const { name, job } = req.query;
  res.send(`Search page for name = ${name} and job = ${job}`);
});

// Move user API routes to router
router.route('/users')
  .get((req, res) => {
    res.json(users);
  })
  .post(async (req, res) => {
    try {
      const { first_name, last_name, email, gender, job_title } = req.body;
      if (!first_name || !last_name || !email || !gender || !job_title) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const user = new UserModel({
        first_name,
        last_name,
        email,
        gender,
        job_title
      });
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to save user" });
    }
  });

router.route('/users/:id')
  .get(async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  })
  .patch(async (req, res) => {
    try {
      const updates = req.body;
      const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User updated successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Failed to update user" });
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User deleted successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

// Mount the router at /api
app.use('/api', router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
