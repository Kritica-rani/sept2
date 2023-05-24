const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.URL;

mongoose
  .connect(URL)
  .then(() => console.log("db is connected"))
  .catch((err) => {
    console.log("Error while connecting db", err.message);
  });
