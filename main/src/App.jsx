import React from 'react'
import Home from './Components/Home'
import Skills from './Components/Skills'
import './App.css'
import Project from './Components/Project'
import Contact from './Components/Contact'
import Main from './Components/Main'
import { Route,Routes } from 'react-router-dom'
import Layout from './Components/Layout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="skill" element={<Skills />} />
          <Route path="project" element={<Project />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
