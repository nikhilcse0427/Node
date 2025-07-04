const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel