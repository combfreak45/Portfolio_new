const Project = require('../databse/projectmodel')

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

      const photo = req.file?.path;

    if (
      !project_name  ||
      typeof project_name !== "string" ||
      !photo  ||
      typeof photo !== "string" ||
      !description  ||
      typeof description !== "string"
    ) {
      return res.status(400).json({ message: "provide correct input" });
    }

    const duplicate = await Project.findOne({ project_name });

    if (duplicate) return res.status(401).json("project already there");

    const project = new Project({
      project_name,photo,github,host,description
    });

    await project.save();

    return res.status(201).json({ message: "ok", project_name: project.project_name });
  } catch (error) {
    console.log("hi" + error);
  }
};

const updateproject = async (req, res) => {
  try {
    const { project_name, github, host, description } = req.body;
     const photo = req.file?.path;

    if (
      project_name === "" ||
      typeof project_name !== "string" ||
      photo === "" ||
      typeof photo !== "string" ||
      description === "" ||
      typeof description !== "string"
    ) {
      return res.status(400).json({ message: "provide correct input" });
    }


    await Project.updateOne({
      project_name,
      photo,
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
