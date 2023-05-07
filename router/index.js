const express = require("express");
const router = express.Router();
const passport = require("passport");

// import controller action
const userController = require("../controller/userController");
const quotationController = require("../controller/quotationController");

// create signup  and signin api
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

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
router.get("/getall", quotationController.getAllQuotations);
module.exports = router;
