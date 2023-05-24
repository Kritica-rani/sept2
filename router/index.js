const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check } = require("express-validator");

// import controller action
const userController = require("../controller/userController");
const quotationController = require("../controller/quotationController");
const validate = [
  check("name").notEmpty().withMessage("Name must not be empty"),
  check("email").isEmail().withMessage("Must be a valid Email"),
  check("password")
    .isLength({ min: 5, max: 8 })
    .withMessage("Min 5 and max 10 chars"),
];
const validateQuotation = [
  check("content").notEmpty().withMessage("Content can not be empty"),
];
// create signup  and signin api
router.post("/signup", validate, userController.signUp);
router.post("/signin", userController.signIn);
router.get(
  "/userdetails",
  passport.authenticate("jwt", { session: false }),
  userController.getUserDetails
);

// routes for quotation
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  quotationController.createQuotation
);
router.delete(
  "/delete/:userId",
  passport.authenticate("jwt", { session: false }),
  quotationController.deleteQuotation
);
router.put(
  "/edit/:userId",
  passport.authenticate("jwt", { session: false }),
  quotationController.editQuotation
);
router.get(
  "/getall",
  passport.authenticate("jwt", { session: false }),
  quotationController.getAllQuotations
);
module.exports = router;
