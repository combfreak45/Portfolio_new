import axios from "axios";
import React, { useEffect, useState } from "react";

const Project = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/project/");
        console.log(response.data);
        if (response.data.message === "ok") {
          setData(response.data.projects);
        } else {
          console.log("error in fetching projects" + error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  return (
    <div className="min-h-screen sm:p-10">
      <div className="flex flex-col sm:gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-10 flex flex-row justify-between items-center flex-wrap"
          >
            <div className="w-[30rem] mb-4 sm:mb-0">
              <img
                src={item.photo}
                alt={item.project_name}
                className="rounded-xl"
              />
            </div>

            <div className="flex flex-col justify-start rounded-3xl text-[#3468C0] w-[35rem] min-h-[12rem] px-10 py-5 bg-[#FF9843] gap-2">
              <div className="text-xl sm:text-3xl font-bold">
                {item.project_name}
              </div>
              <div className="font-thin bg-[#FFDD95] rounded-md p-2 ">
                {item.description}
              </div>
              <div className="w-20 bg-[#FFDD95] text-center rounded-md  hover:scale-125">
                <a href={item.github}>GitHub</a>
              </div>
              <div className="w-20 bg-[#FFDD95] text-center rounded-md hover:scale-125">
                <a href={item.host}>Host</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
