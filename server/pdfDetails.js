const mongoose = require("mongoose");

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
