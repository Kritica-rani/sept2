const mongoose = require("mongoose");
const URL =
  "mongodb+srv://kritica:1234@spt2.zyuvvep.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .then(() => console.log("db is connected"))
  .catch((err) => {
    console.log("Error while connecting db", err.message);
  });
