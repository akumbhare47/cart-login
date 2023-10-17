require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`connection successful`);
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports = connectDB;
