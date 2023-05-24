// import User from Model
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { validationResult } = require("express-validator");

module.exports.signUp = async (req, res) => {
  try {
    // validate this data
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        message: "Validation Error",
        data: error,
      });
    }
    //1. get the data from req.body

    console.log("req.body", req.body);
    const { name, email, password, confirmPassword } = req.body;

    //2. check if password and confirm password are same or not
    if (password != confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm does not match!!",
        data: {},
      });
    }
    //3. check for email if its there or not
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        data: {},
      });
    }
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    //4 . create user
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    // 5.--> send the response
    return res.status(200).json({
      message: "User created succesfully",
      data: {
        name,
        email,
      },
    });
  } catch (err) {
    // send error response
    res.status(500).json({
      message: "Something went went while creating user",
      data: {
        err,
      },
    });
  }
};

// sign controller action

module.exports.signIn = async (req, res) => {
  try {
    //1. fetch email and password from req.body
    const { email, password } = req.body;
    //2. fetch user data from db using emailid
    const user = await User.findOne({ email: email });
    //3. check whether user exist or not
    if (!user) {
      return res.status(400).json({
        message: "Please signUp to use our Platform",
        data: {},
      });
    }
    //4.compare the credentials
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        message: "Password does not match",
        data: {},
      });
    }
    // 4a. else respose name/email is incorrect
    // 4b. if correct --> succesfully logged in
    const token = jwt.sign({ email: user.email }, "secret", {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "user logged in succesfully",
      data: {
        token,
      },
    });
  } catch (err) {
    // send error response
    res.status(500).json({
      message: "Something went went while logging in",
      data: {
        err,
      },
    });
  }
};

// get all user details
module.exports.getUserDetails = async (req, res) => {
  try {
    //1. get userId from req.user
    console.log("userId", req.user);
    //destructuring
    const { _id: userId } = req.user;
    //2. fetch userDetail from User Model using userId
    const userDetails = await User.findById(
      userId,
      "name email quotation"
    ).populate([
      {
        path: "quotation",
        //only for example
        populate: {
          path: "user",
          select: "name",
        },
      },
    ]);
    // response with userDetails
    return res.status(200).json({
      message: "User Found Successfully",
      data: userDetails,
    });
  } catch (err) {
    // send error response
    res.status(500).json({
      message: "Something went went while logging in",
      data: {
        err,
      },
    });
  }
};
