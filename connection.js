const mongoose = require('mongoose');

const url = "mongodb+srv://nikhilverma0427:3Uc7TscofacwjURU@cluster0.i55xgqv.mongodb.net";
mongoose.connect(url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });