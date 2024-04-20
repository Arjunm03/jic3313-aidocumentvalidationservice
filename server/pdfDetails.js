const mongoose = require("mongoose");

// Schema for storing PDF Details
const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
    type: String,
    user: String,
    validationStatus: String,
    validationDescription: String,
  },
  { collection: "PdfDetails" }
);

// Schema for storing user information
const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    usertype: String,
  },
  { collection: "loginInfo" }
);

mongoose.model("PdfDetails", PdfDetailsSchema);
mongoose.model("loginInfo", userSchema);
