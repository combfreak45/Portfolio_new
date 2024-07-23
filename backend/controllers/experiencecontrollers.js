const cloudinary = require("cloudinary").v2;
const Experience = require("../databse/experiencemodel");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const getExperience = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json({ message: "ok", experiences });
  } catch (error) {
    console.log(error);
  }
};

const createExperience = async (req, res) => {
  try {
    const { company_name, duration, role, description } = req.body;

    const photodata = req.file;

    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    if (
      !company_name ||
      typeof company_name !== "string" ||
      !description ||
      typeof description !== "string"
    ) {
      return res.status(400).json({ message: "provide correct input" });
    }

    if (!photodata) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const duplicate = await Experience.findOne({ company_name });

    if (duplicate) return res.status(401).json("project already there");

    let result;

    try {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "project",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      console.log("Image upload error:", error);
      throw new Error("Image could not be uploaded");
    }

    const experience = new Experience({
      company_name,
      photo: result.secure_url,
      duration,
      role,
      description,
    });

    await experience.save();

    return res
      .status(201)
      .json({ message: "ok", company_name: experience.company_name });
  } catch (error) {
    console.log("hi" + error);
  }
};

// const updateExperience = async (req, res) => {
//   try {
//     const { company_name, duration, role, description } = req.body;
//     const photo = req.file;

//     if (
//       company_name === "" ||
//       typeof company_name !== "string" ||
//       description === "" ||
//       typeof description !== "string"
//     ) {
//       return res.status(400).json({ message: "provide correct input" });
//     }

//     if (!photo) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const result = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ folder: "project" }, (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         })
//         .end(photo.buffer);
//     });

//     await Project.updateOne({
//       project_name,
//       photo: result.secure_url,
//       github,
//       host,
//       description,
//     });

//     return res.status(201).json({ message: "ok", project_name: project_name });
//   } catch (error) {
//     console.log(error);
//   }
// };

const deleteExperience = async (req, res) => {
  try {
    const { company_name } = req.params;

    await Project.deleteOne({ company_name: company_name });

    res.status(200).json({
      message: `${company_name} deleted`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getExperience, createExperience, deleteExperience };
