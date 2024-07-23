import React, { useState, useEffect } from "react";
import axios from "axios";

const SkillList = () => {

  const [skill, setSkill] = useState([]);
  const [newskill,setNewskill] = useState(""
  )
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/skill");
        setSkill(response.data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

   const deleteSkill = async (skill) =>{
    try {
        await axios.delete(`http://localhost:5000/skill/${skill}`);
        setSkill((prevSkill) => prevSkill.filter((s) => s.skill !== skill));
    } catch (error) {
        console.log(error);
    }
   }

   const handleAddSkill = async () => {
     try {
       const response = await axios.post("http://localhost:5000/skill", {
         skill: newskill,
       });

       setSkill((prevSkills) => [...prevSkills, response.data.skill]);

       setNewskill("");


     } catch (error) {
       console.error("Error adding skill:", error);
     }
   };

  return (
    <div>
      <div>
        <div className="text-3xl py-3 text-center">Skill List</div>
        <div>
          {skill.map((s) => (
            <div key={s?._id} className="flex flex-row gap-2 text-2xl border-black border-2  m-1 p-2 justify-between items-center">
              <div>{s?.skill}</div>
              <button onClick={() => deleteSkill(s.skill)} className="bg-red-400 p-1">Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-3xl py-3 text-center">Add Skill</div>
        <div>
          <form
            className="flex flex-col gap-4 text-2xl border-black border-2  m-1 justify-between p-3 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddSkill();
            }}
          >
            <label htmlFor="new_skill">Skill</label>
            <input
            className="border-black border-2"
              type="text"
              id="new_skill"
              value={newskill}
              onChange={(e) => setNewskill(e.target.value)}
            />
            <input type="submit" value="Add" className="cursor-pointer bg-red-400 p-1 rounded-lg" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillList;
