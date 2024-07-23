import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Skills = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-new-rust-ten.vercel.app/skill"
        );
        if (response.data.message === "ok") {
          setData(response.data.skills);
        } else {
          console.log("message is not ok");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <motion.div className="  min-h-screen m-5 rounded-2xl flex flex-row  flex-wrap gap-5 sm:p-20 justify-center text-white">
      {data.map((item) => (
        <div
          className="p-2  border-4  w-[15rem] sm:w-[20rem] h-[10rem] flex items-center justify-center text-3xl rounded-3xl hover:scale-125 hover:cursor-pointer hover:bg-white  hover:text-black"
          key={item._id}
        >
          {item.skill}
        </div>
      ))}
    </motion.div>
  );
};

export default Skills;
