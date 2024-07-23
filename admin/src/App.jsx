import React from 'react'
import SkillList from './components/Skill'
import Project from './components/Project'
import Experience from './components/Experience';

const App = () => {
  return (
    <div className="m-0 p-0 bg-slate-200">
      <div className="text-center text-[10rem] font-semibold p-5">
        Admin Panel
      </div>
      <div className="p-5">
        <div className="text-4xl font-semibold py-5">Experience</div>
        <Experience />
      </div>
      <div className="p-5">
        <div className="text-4xl font-semibold py-5 ">Skill</div>
        <SkillList />
      </div>
      <div className="p-5">
        <div className="text-4xl font-semibold py-5">Project</div>
        <Project />
      </div>
    </div>
  );
}

export default App
