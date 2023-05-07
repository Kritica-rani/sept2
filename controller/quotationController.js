const Quotation = require("../model/quotation");
const { find } = require("../model/user");
const User = require("../model/user");

// controller to create quotation
module.exports.createQuotation = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user._id;
    // const {_id : userId} = req.user
    console.log("req.user", req.user);
    const quotation = await Quotation.create({
      content: content,
      user: userId,
    });
    if (!quotation) {
      return res.status(400).json({
        message: "Something went wrong while creating quotation",
        data: {},
      });
    }
    const user = await User.findById(userId);
    user.quotation.push(quotation._id);
    return res.status(201).json({
      message: "Quotation created Succesfully",
      data: { quotation },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong!!",
      data: err,
    });
  }
};

module.exports.deleteQuotation = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedQuotation = await Quotation.findByIdAndDelete(userId);
    if (!deletedQuotation) {
      return res.status(400).json({
        message: "Not found!!",
        data: {},
      });
    }
    return res.status(200).json({
      message: "Success",
      data: deletedQuotation,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while deleting quotation!!",
      data: err,
    });
  }
};

module.exports.editQuotation = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;
    const updatedQuotation = await Quotation.findByIdAndUpdate(
      userId,
      {
        content,
      },
      { new: true }
    );
    if (!updatedQuotation) {
      return res.status(400).json({
        message: "Not Found!!",
        data: {},
      });
    }
    return res.status(200).json({
      message: "Content update Succesfully",
      data: updatedQuotation,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while editing quotation!!",
      data: err,
    });
  }
};

// populate

module.exports.getAllQuotations = async (req, res) => {
  try {
    //1. fetch all quotations from db
    const quotations = await Quotation.find({}).populate({
      path: "user",
      select: "name email",
    });

    // const quotations = await Quotation.find({}).populate("user", "name");

    res.status(200).json({
      message: "Succesfully fetched all quotations",
      data: { quotations },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while editing quotation!!",
      data: err,
    });
  }
};
