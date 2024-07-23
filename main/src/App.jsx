import React from 'react'
import Home from './Components/Home'
import Skills from './Components/Skills'
import './App.css'
import Project from './Components/Project'
import Contact from './Components/Contact'
import { Route,Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Experience from './Components/Experience'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experience" element={<Experience />} />
          <Route path="skill" element={<Skills />} />
          <Route path="project" element={<Project />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
