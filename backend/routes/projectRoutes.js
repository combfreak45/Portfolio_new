const express = require('express')
const { getProjects, createproject, updateproject, deleteProject } = require('../controllers/projectcontrollers')
const projectRoute = express.Router()


const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

projectRoute.route('/').get(getProjects)

projectRoute.post("/",upload.single('photo'),createproject)
projectRoute.patch("/", upload.single("photo"), updateproject);
projectRoute.route('/:name').delete(deleteProject)
module.exports = projectRoute