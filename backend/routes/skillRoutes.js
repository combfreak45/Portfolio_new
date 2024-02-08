const express = require('express')
const { getSkills, createskill, deleteSkill } = require('../controllers/skillcontrollers')

const skillRouter = express.Router()

skillRouter.route('/').get(getSkills).post(createskill)

skillRouter.route("/:skill").delete(deleteSkill);

module.exports = skillRouter