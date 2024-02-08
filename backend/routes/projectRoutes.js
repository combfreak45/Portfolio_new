const express = require('express')
const { getProjects, createproject, updateproject, deleteProject } = require('../controllers/projectcontrollers')
const projectRoute = express.Router()

projectRoute.route('/').get(getProjects).post(createproject).patch(updateproject)

projectRoute.route('/:name').delete(deleteProject)
module.exports = projectRoute