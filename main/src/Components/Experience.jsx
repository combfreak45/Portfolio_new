import axios from "axios";
import React, { useEffect, useState } from "react";

const Experience = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getExperience = async () => {
      try {
        const response = await axios.get(
          "https://portfolio-new-arjits-projects-4f88e43c.vercel.app/experience"
        );
        console.log(response.data);
        if (response.data.message === "ok") {
          setData(response.data.experiences);
        } else {
          console.log("error in fetching exp" + error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getExperience();
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
                alt={item.company_name}
                className="rounded-xl"
              />
            </div>

            <div className="flex flex-col justify-start rounded-3xl text-black  bg-white w-[35rem] min-h-[12rem] px-10 py-5 gap-2">
              <div className="text-xl sm:text-3xl font-bold">
                {item.company_name}
              </div>
              <div className="w-20  text-center text-white bg-black rounded-md  hover:scale-125">
                <h2>{item.role}</h2>
              </div>
              <div className="w-20  text-center text-white bg-black rounded-md  hover:scale-125">
                <h2>{item.duration}</h2>
              </div>
              <div className="font-thin  rounded-md p-2 ">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
