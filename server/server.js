const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/files", express.static("files"));
const { MongoClient } = require("mongodb");
//mongodb connection----------------------------------------------
const mongoUrl =
  "mongodb+srv://jdUser:Team3313@juniordesigndb.je5c0cg.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
const loginInfo = mongoose.model("loginInfo");

//multer------------------------------------------------------------
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log("Uploading File");
  const title = req.body.title;
  const user = req.body.user;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName, user: user });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-files-user//", async (req, res) => {
  res.send({ status: "ok", data: {} });
});

app.get("/get-files-user/:username/:usertype", async (req, res) => {
  userType = req.params.usertype
  if(userType === "user") {
    const info = {
      user: req.params.username,
    };
    try {
      PdfSchema.find(info).then((data) => {
        console.log(data);
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  } else {
    try {
      PdfSchema.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  }
});

app.get("/verify/:username/pass/:password", async (req, res) => {
  /*
  Sends true if the login info is valid, false otherwise. 
  */
  const info = {
    username: req.params.username,
    password: req.params.password,
  };
  console.log(info);
  const entry = loginInfo.find(info).then((data) => {
    if (data.length) {
      console.log(data[0].usertype);
      res.send({ status: true, userType: data[0].usertype });
    } else {
      res.send({ status: false });
    }
  });
});

//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!");
});

app.listen(3001, () => {
  console.log("Server Started on Port 3001");
});
