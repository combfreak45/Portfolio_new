const express = require("express");
const {
  getExperience,
  createExperience,
  deleteExperience,
} = require("../controllers/experiencecontrollers");
const experienceRoute = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload1/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
experienceRoute.route("/").get(getExperience);

experienceRoute.post("/", upload.single("photo"), createExperience);
// experienceRoute.patch("/", upload.single("photo"), updateExperience);
experienceRoute.route("/:company_name").delete(deleteExperience);
module.exports = experienceRoute;
