const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/files", express.static("files"));
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

//Connect to DB and define schemas ----------------------------------------------------------------

const mongoUrl =
  "mongodb+srv://jdUser:Team3313@juniordesigndb.je5c0cg.mongodb.net/?retryWrites=true&w=majority";

// let bucket;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
    // bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: "PDFBucket"});
  })
  .catch((e) => console.log(e));

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
const loginInfo = mongoose.model("loginInfo");

//multer------------------------------------------------------------

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

// const mongoUpload = () => {
//   const storage = new GridFsStorage({
//     url: mongoUrl,
//     file: (req, file) => {
//       return new Promise((resolve, _reject) => {
//         const fileInfo = {
//           filename: file.originalname,
//           bucketName: "PDFBucket",
//         };
//         resolve(fileInfo);
//       });
//     },
//   });

//   return multer({ storage });
// }

// function upload(req, res, next) {
//   mongoUpload().single('file')(req, res, next);
//   localUpload.single('file')(req, res, next);
// }

// API Post Functions ----------------------------------------------------------------

// Upload a file
app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log("Uploading File");
  const title = req.body.title;
  const user = req.body.user;
  const fileName = req.file.filename;
  const type = req.body.type;
  const status = "Unprocessed";
  const description = "Unprocessed";
  console.log(type);
  try {
    await PdfSchema.create({
      title: title,
      pdf: fileName,
      type: type,
      user: user,
      validationStatus: status,
      validationDescription: description,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

// Creates a new user
app.post("/create-user/:username/:password", async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  const info = {
    username: username,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    usertype: "user",
  };
  try {
    var check = false;
    await loginInfo.find({ username: username }).then((data) => {
      if (data.length) {
        check = true;
      }
    });
    if (check) {
      res.send({ status: `ex` });
      console.log("Duplicate Detected");
    } else {
      await loginInfo.create(info);
      res.send({ status: `ok` });
      console.log("Account Created");
    }
  } catch (error) {
    res.json({ status: error });
  }
});

// API Get Functions ----------------------------------------------------------------

// Dummy function when the application first starts
app.get("/get-files-user//", async (req, res) => {
  res.send({ status: "ok", data: {} });
});

// Gets the files for a user or admin depending on logged in user
app.get("/get-files-user/:username/:usertype", async (req, res) => {
  userType = req.params.usertype;
  if (userType === "user") {
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

// Sends true if the login info is correct, false otherwise
app.get("/verify/:username/pass/:password", async (req, res) => {
  const info = {
    username: req.params.username,
  };
  console.log(info);
  const entry = loginInfo.find(info).then((data) => {
    if (
      data.length &&
      bcrypt.compareSync(req.params.password, data[0].password)
    ) {
      console.log(data[0].usertype);
      res.send({ status: true, userType: data[0].usertype });
    } else {
      res.send({ status: false });
    }
  });
});

// Get Validation Data
app.get("/validation-data/:data", async (req, res) => {
  // console.log(data);

  PdfSchema.findById(req.params.data).then((data) => {
    if (!data) {
      res.send({ status: false });
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

// API Put Functions ----------------------------------------------------------------

// Update the Validation Results for a given PDF.
app.put("/update-validation/:status/:description/:docID", async (req, res) => {
  console.log("Updating Validation Results!");
  PdfSchema.findByIdAndUpdate(
    req.params.docID,
    {
      validationStatus: req.params.status,
      validationDescription: req.params.description,
    },
    { new: true }
  ).then((data) => {
    if (!data) {
      res.send({ status: false });
    } else {
      res.send(data);
    }
  });
});

// API Delete Functions ----------------------------------------------------------------

//Delete Document by ID
app.delete("/delete-doc-byid/:docID", async (req, res) => {
  console.log(`Deleting Document with ID ${req.params.docID}`);
  PdfSchema.findByIdAndDelete(req.params.docID).then((data) => {
    if (!data) {
      res.sendStatus({ status: false });
    } else {
      res.send(data);
    }
  });
});

//API Connections ----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!");
});

app.listen(3001, () => {
  console.log("Server Started on Port 3001");
});
