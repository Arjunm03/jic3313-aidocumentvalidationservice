const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
    users: [String],
  },
  { collection: "PdfDetails" }
);

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String, 
  },
  { collection: "loginInfo" }
)

mongoose.model("PdfDetails", PdfDetailsSchema);
mongoose.model("loginInfo", userSchema);