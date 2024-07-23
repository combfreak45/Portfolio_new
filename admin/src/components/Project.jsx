import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Project = () => {

  const [projectList,setProjectList] = useState([])
  const [project_name,setProject_name] = useState("")
  const [photo,setPhoto] = useState(null)
  const [github,setGithub] = useState("")
  const [host,setHost] = useState("")
  const [description,setDescription] = useState("")

  useEffect(()=>{
    
  const fetchprojects = async () => {
     
    try {
        const project = await axios.get(
          "https://portfolio-new-arjits-projects-4f88e43c.vercel.app/project"
        );
        setProjectList(project.data.projects)
    } catch (error) {
        console.log(error);
    }
}
  fetchprojects()
  },[])

  const handleDelete = async (project_name) => {
    try {
      await axios.delete(
        `https://portfolio-new-arjits-projects-4f88e43c.vercel.app/project/${project_name}`
      );
      setProjectList((prevProject) => prevProject.filter((s) => s.project_name !== project_name));

    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProject = async () =>{


     const formData = new FormData();
     formData.append("project_name", project_name);
     formData.append("photo", photo);
     formData.append("github", github);
     formData.append("host", host);
     formData.append("description", description);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

     try {
       const response = await axios.post(
         "https://portfolio-new-arjits-projects-4f88e43c.vercel.app/project",
         formData,
         {
           headers: { "Content-Type": "multipart/form-data" },
         }
       );

     if(response.data.message==="ok"){
       setProjectList((prevProjects) => [...prevProjects, response.data.projects]);

       setProject_name("");
       setPhoto(null);
       setGithub("");
       setHost("");
       setDescription("");

     }
     else{
      console.log(response.status);
     }

     } catch (error) {
       console.error("Error adding project:", error);
     }
  }

  return (
    <div>
      <div className="text-3xl py-3 text-center">Project List</div>
      <div>
        {projectList.map((p) => (
          <div key={p?._id} className="flex flex-row gap-2 text-2xl border-black border-2  m-1 p-2 justify-between items-center">
            <div className="flex flex-row gap-10 items-center">
              <div>{p?.project_name}</div>
              <img
                src={p?.photo}
                alt={p?.project_name}
                width={200}
                height={200}
              />
              <div>
                <a href={p?.github}>Github</a>
              </div>
              <div>
                <a href={p?.host}>Host</a>
              </div>
              <div>{p?.description}</div>
            </div>
            <button
              onClick={() => handleDelete(p?.project_name)}
              className="bg-red-400 p-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      
      <div className="text-3xl py-3 text-center">Add Project</div>
      <div>
        <form
          className="flex flex-col gap-4 text-xl border-black border-2 m-1 justify-between p-3 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProject();
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            className="border-black border-2"
            type="text"
            id="name"
            value={project_name}
            onChange={(e) => setProject_name(e.target.value)}
          />
          <label htmlFor="photo">Photo Link</label>
          <input
            className="border-black border-2"
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <label htmlFor="github">GitHub</label>
          <input
            className="border-black border-2"
            type="text"
            id="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <label htmlFor="host">Host</label>
          <input
            className="border-black border-2"
            type="text"
            id="host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
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
}

export default Project
