import React, { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
  const [ExperienceList, setExperienceList] = useState([]);
  const [company_name, setCompany_name] = useState("");
  const [photo, setPhoto] = useState(null);
  const [duration, setDuration] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const Experience = await axios.get(
          "https://portfolio-new-arjits-projects-4f88e43c.vercel.app/experience"
        );
        setExperienceList(Experience.data.experiences);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExperiences();
  }, []);

  const handleDelete = async (company_name) => {
    try {
      await axios.delete(
        `https://portfolio-new-arjits-projects-4f88e43c.vercel.app/experience/${company_name}`
      );
      setExperienceList((prevExperience) =>
        prevExperience.filter((s) => s.company_name !== company_name)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddExperience = async () => {
    const formData = new FormData();
    formData.append("company_name", company_name);
    formData.append("photo", photo);
    formData.append("duration", duration);
    formData.append("role", role);
    formData.append("description", description);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post(
        "https://portfolio-new-arjits-projects-4f88e43c.vercel.app/experience",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.message === "ok") {
        setExperienceList((prevExperiences) => [
          ...prevExperiences,
          response.data.experiences,
        ]);

        setCompany_name("");
        setPhoto(null);
        setDuration("");
        setRole("");
        setDescription("");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Error adding Experience:", error);
    }
  };

  return (
    <div>
      <div className="text-3xl py-3 text-center">Experience List</div>
      <div>
        {ExperienceList.map((p) => (
          <div
            key={p?._id}
            className="flex flex-row gap-2 text-2xl border-black border-2  m-1 p-2 justify-between items-center"
          >
            <div className="flex flex-row gap-10 items-center">
              <div>{p?.company_name}</div>
              <img
                src={p?.photo}
                alt={p?.company_name}
                width={200}
                height={200}
              />
              <div>
                <a href={p?.duration}>Github</a>
              </div>
              <div>
                <a href={p?.role}>Host</a>
              </div>
              <div>{p?.description}</div>
            </div>
            <button
              onClick={() => handleDelete(p?.company_name)}
              className="bg-red-400 p-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="text-3xl py-3 text-center">Add Experience</div>
      <div>
        <form
          className="flex flex-col gap-4 text-xl border-black border-2 m-1 justify-between p-3 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddExperience();
          }}
        >
          <label htmlFor="name">Company Name</label>
          <input
            className="border-black border-2"
            type="text"
            id="name"
            value={company_name}
            onChange={(e) => setCompany_name(e.target.value)}
          />
          <label htmlFor="photo">Photo Link</label>
          <input
            className="border-black border-2"
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <label htmlFor="duration">Duration</label>
          <input
            className="border-black border-2"
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <label htmlFor="role">Host</label>
          <input
            className="border-black border-2"
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <input
            className="border-black border-2"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="submit"
            value="Add"
            className="cursor-pointer bg-red-400 p-1 rounded-lg"
          />
        </form>
      </div>
    </div>
  );
};

export default Experience;
