const mongoose = require("mongoose");

//define schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    quotation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quotation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
