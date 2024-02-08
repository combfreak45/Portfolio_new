const Skill = require("../databse/skillmodel");

const getSkills = async (req, res) => {
  try {
   const skills = await Skill.find()
    return res.status(200).json({ message: "ok", skills });
    
  } catch (error) {
    console.log(error);
  }
};

const createskill = async (req, res) => {
  try {
    const { skill } = req.body;

    if (skill === "" || typeof skill !== "string") {
      return res.status(400).json({ message: "provide correct input" });
    }

    const duplicate = await Skill.findOne({ skill });

    if (duplicate) return res.status(401).json("skill already there");

    const SKILL = new Skill({
      skill: skill,
    });

    await SKILL.save();

    return res.status(201).json({ message: "ok" , skill: SKILL.skill});
  } catch (error) {
    console.log(error);
  }
};

const deleteSkill = async (req,res)=>{
  try {
    const {skill} = req.params;


    await Skill.deleteOne({ skill});

    return res.status(200).json({
      message: `${skill} deleted`,
    });
  } catch (error) {
    console.log(
      error
    );
  }
}

module.exports = {getSkills,createskill,deleteSkill};
