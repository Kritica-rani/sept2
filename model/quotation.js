const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Quotation = mongoose.model("quotation", quotationSchema);

module.exports = Quotation;
