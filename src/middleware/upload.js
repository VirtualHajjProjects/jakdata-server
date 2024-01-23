const path = require("path");
const multer = require("multer");
const moment = require("moment");

var storage = multer.diskStorage({
  destination: function (req, res, callback) {
    callback(null, "storage/");
  },
  filename: function (req, res, callback) {
    let ext = path.extname(res.originalname);
    callback(null, "image-" + moment().format("x") + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, res, callback) {
    if (
      res.mimetype == "image/png" ||
      res.mimetype == "image/jpg" ||
      res.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("Hanya mendukung file JPG atau PNG");
      callback(null, false);
    }
  },
  limits: {
    fieldSize: 1048576,
  },
}).single("files");

module.exports = upload;
