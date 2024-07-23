const cloudinary = require("cloudinary").v2;
const Project = require('../databse/projectmodel')
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const getProjects = async (req, res) => {
  try {

    const projects = await Project.find()
    res.status(200).json({ message: "ok" ,projects});

  } catch (error) {
    console.log(error);
  }
};


const createproject = async (req, res) => {
  try {
      const { 
      project_name,
      github,
      host,
      description } = req.body;

      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data"+req.file.mimetype + ";base64" +b64;

    if (
      !project_name ||
      typeof project_name !== "string" ||
      !description ||
      typeof description !== "string"
    ) {
      return res.status(400).json({ message: "provide correct input" });
    }


    const duplicate = await Project.findOne({ project_name });

    if (duplicate) return res.status(401).json("project already there");

    let result;

    try {
       result = await cloudinary.uploader.upload(
        dataURI,
        { folder: "project",resource_type : "auto" 
        }
      );
    } catch (error) {
      res.status(500);
      console.log("Image upload error:", error);
      throw new Error("Image could not be uploaded");
    }
    

    const project = new Project({
      project_name,
      photo: result.secure_url,
      github,
      host,
      description,
    });

    await project.save();

    return res
      .status(201)
      .json({ message: "ok", project_name: project.project_name });

  } catch (error) {
     console.log("Create project error:", error);
     res.status(500).json({ message: "Internal server error" });
  }
};

const updateproject = async (req, res) => {
  try {
    const { project_name, github, host, description } = req.body;
     const photo = req.file;

    if (
      project_name === "" ||
      typeof project_name !== "string" ||
      description === "" ||
      typeof description !== "string"
    ) {
      return res.status(400).json({ message: "provide correct input" });
    }

    if (!photo) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "project" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(photo.buffer);
    });

    await Project.updateOne({
      project_name,
      photo : result.secure_url,
      github,
      host,
      description,
    });


    return res
      .status(201)
      .json({ message: "ok", project_name: project_name });
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (req,res) =>{
  try {
    const {name} = req.params;

    await Project.deleteOne({project_name:name});

    res.status(200).json({
      message: `${name} deleted`,
    });
  } catch (error) {
    console.log(error);
    
  }
}



module.exports = {getProjects,createproject,updateproject,deleteProject}
